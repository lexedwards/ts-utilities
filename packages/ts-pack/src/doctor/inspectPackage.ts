import { extname } from 'node:path'
import { logResult, logWarning, green, logInfo } from '../std'
import { ScopedPackageJson } from '../configs'

interface Rule<T = unknown> {
  name: string
  verify: (pkg: ScopedPackageJson) => T
  message: (result: T) => void
}

function isESModule(pkgJson: ScopedPackageJson): boolean {
  return pkgJson.type === 'module'
}

const pkgJsonRules: Rule[] = [
  {
    name: 'Package Name',
    verify: (pkg): boolean => {
      return !!pkg.name
    },
    message: (result: boolean) => {
      logResult(result, `Package name declared`)
    },
  },
  {
    name: 'Package Version',
    verify: (pkg): boolean => {
      return !!pkg.version
    },
    message: (result: boolean) => {
      logResult(result, `Package version declared`)
    },
  },
  {
    name: 'Module Detection',
    verify: (pkg): string => {
      return isESModule(pkg) ? 'ES Module' : 'Common JS'
    },
    message: (result: string) => {
      console.info(`${result} Package Detected\n`)
    },
  },
  {
    name: 'Common JS',
    verify: (pkg): boolean | undefined => {
      if (isESModule(pkg) && !pkg.main) return
      return !!pkg.main
    },
    message: (result: boolean | undefined) => {
      logResult(result, `Exports Common JS`)
      if (result === false) {
        logWarning(`Missing "main" property in package.json`)
      }
      if (result === undefined) {
        logInfo(
          `While optional for ES Module Packages, this choice can break environments who haven't adopted ESM yet.`,
        )
      }
    },
  },
  {
    name: 'Exported CJS Extension',
    verify: (pkg): boolean | undefined => {
      if (!pkg.main) return
      const ext = extname(pkg.main as string)
      if (isESModule(pkg)) {
        return ext === '.cjs'
      }
      return ext === '.cjs' || ext === '.js'
    },
    message: (result: boolean | undefined) => {
      if (typeof result === 'undefined') return
      logResult(result, `Exported Common JS Correct File Extension`)
      if (!result) {
        logInfo(
          `CommonJS Exports can be ".cjs", but ".js" is considered ESM when "type":"module" exists in package.json`,
        )
      }
    },
  },
  {
    name: 'ES Module',
    verify: (pkg): boolean | undefined => {
      if (!isESModule(pkg) && !pkg.module) return
      return !!pkg.module
    },
    message: (result: boolean | undefined) => {
      logResult(result, `Exports ES Module`)
      if (result === false) {
        logWarning(`Missing "module" property in package.json`)
      }
      if (result === undefined) {
        logInfo(
          `While optional for CommonJS Packages, this option can be beneficial for many`,
        )
      }
    },
  },
  {
    name: 'Exported ESM Extension',
    verify: (pkg): boolean | undefined => {
      if (!pkg.module) return
      const ext = extname(pkg.module as string)
      if (!isESModule(pkg)) {
        return ext === '.mjs'
      }
      return ext === '.mjs' || ext === '.js'
    },
    message: (result: boolean | undefined) => {
      if (typeof result === 'undefined') return
      logResult(result, `Exported ES Module Correct File Extension`)
      if (!result) {
        logInfo(
          `ES Module Exports can be ".mjs", but ".js" is considered CJS when "type":"commonjs" exists in package.json or is omitted`,
        )
      }
    },
  },
  {
    name: 'Exports Types',
    verify(pkg): boolean | undefined {
      if (!pkg.types) return
      return !!pkg.types
    },
    message(result: boolean | undefined) {
      logResult(result, `Exports Types for developers`)
      if (!result) {
        logInfo(
          `Exporting types, while optional, aid developers who consume your library.
Add "types": "<dist folder>/<@types folder>/index.d.ts" to give them a hand!`,
        )
      }
    },
  },
  {
    name: 'Exported Type Extension',
    verify(pkg): boolean | undefined {
      if (!pkg.types) return
      return /.d.ts$/.test(pkg.types as string)
    },
    message(result: boolean | undefined) {
      if (typeof result === 'undefined') return
      logResult(result, `Exported Types Correct File Extension`)
      if (!result) {
        logWarning(`Types Exports should be with the extension ".d.ts"`)
      }
    },
  },
  {
    name: 'Limit Files released',
    verify(pkg): boolean {
      return pkg.files && (pkg.files as Array<string>).length > 0
    },
    message(result: boolean) {
      logResult(result, `Limited files packaged on release`)
      if (!result) {
        logWarning(
          `To limit release size, only include build folder with "files" property.
Package.json and README.md will automatically be packaged.

i.e.: 
{
  "files": ["dist"],
}`,
        )
      }
    },
  },
  {
    name: 'Additional Bundler Support - Root Property',
    verify(pkg): boolean | undefined {
      return !!pkg.exports?.['.']
    },
    message(result: boolean | undefined) {
      logResult(result, 'Additional bundler support - Root')
      if (!result) {
        return logWarning(
          `
Additional generations of bundler support can be added with "exports" in package.json.
A root exports property (".") informs the consuming resolver to use CJS or ESM.

i.e.:
{
  "exports": {
    ".": {
      // [...]
    }
  }
}`,
        )
      }
    },
  },
  {
    name: 'Additional Bundler Support - Root Common JS',
    verify(pkg): boolean | undefined {
      return pkg.main ? !!pkg.exports?.['.']?.require : undefined
    },
    message(result: boolean | undefined) {
      if (typeof result === 'undefined') return
      logResult(!!result, 'Additional bundler support - Root Common JS')
      if (!result) {
        logWarning(`
Inform bundlers to use the Common JS Bundle when using the keyword "require"

i.e.:

"exports": {
  ".": {
    "require": "./<dist>/<common js folder>/index.cjs"
  }
}`)
      }
    },
  },
  {
    name: 'Additional Bundler Support - Root ES Modules',
    verify(pkg): boolean | undefined {
      return pkg.module ? !!pkg.exports?.['.']?.import : undefined
    },
    message(result: boolean | undefined) {
      if (typeof result === 'undefined') return
      logResult(!!result, 'Additional bundler support - Root ES Modules')
      if (!result) {
        logWarning(`
Inform bundlers to use the ES Module Bundle when using the keyword "import"

i.e.:
{
  "exports": {
    ".": {
      "import": "./<dist>/<es modules folder>/index.mjs"
    }
  }
}
`)
      }
    },
  },
  {
    name: 'Additional Bundler Support - Root Types',
    verify(pkg): boolean | undefined {
      return pkg.types ? !!pkg.exports?.['.']?.types : undefined
    },
    message(result: boolean | undefined) {
      if (typeof result === 'undefined') return
      logResult(!!result, 'Additional bundler support - Root Types')
      if (!result) {
        logWarning(`
Inform bundlers to use the Types declaration file

i.e.:

"exports": {
  ".": {
    "types": "./<dist>/<@types folder>/index.d.ts"
  }
}`)
      }
    },
  },
]

export function inspectPackageConfigs(pkgJson: ScopedPackageJson) {
  console.info(green(`🩺 Verifying Package.json... \n`))
  pkgJsonRules.forEach((rule) => rule.message(rule.verify(pkgJson)))
}
