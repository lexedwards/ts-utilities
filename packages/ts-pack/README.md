# TS-Pack

A preconfigured [rollup.js]() bundler for Typescript Libraries, with additional aid to help configure the library's `package.json`.

- [Usage](#usage)
  - [Requirements](#requirements)
  - [Init](#init)
  - [Doctor](#doctor)
  - [Build](#build)
    - [Notable Properties](#notable-properties)
    - [Pack configuration](#pack-configuration)
- [Roadmap](#roadmap)

## Usage

```
  A preconfigured bundler using local package.json + tsconfig.json to bundle your library.

  Configurations via flags or package.json:
    --help, -h, ts-pack.help
        Display this message

    --doctor, -d, ts-pack.doctor
        Perform a check on package.json's configuration

    --init
        Writes to package.json a standard default setup for typescript libraries

    --tsConfig, -c, ts-pack.tsConfig
        Specify the typescript config to use on build
        default: 'tsconfig.json'

    --inputFile, -i, ts-pack.inputFile
        Specify the entry point to bundle.
        default: 'src/index.ts'

    --bundle, -b, ts-pack.bundle
        Bundle dependencies in distribution.
        Useful for only relying on native node dependencies. i.e. lambdas
        default: false

    --preserveModules, -p, ts-pack.preserveModules
        Preserved for future usage, currently does not affect bundling
        default: false

    --external, -e, ts-pack.external
        Declare external packages when bundling. (Can be used multiple times)
        Useful when the runtime environment has modules additional to the core standard library. i.e. Lambdas
        default: empty
```

### Requirements

This library will only work on Node v18 or higher, this is because it utilises new improvements such as the new parseArgs module.

### Init

> All present configurations will persist through this operation. If you want to have them reconfigured, delete them.

An initial setup script, that when ran, will configure `package.json` for you with best practices, following guidance directly from npmjs. These will ensure that fields that, if not present already, are set correctly for best compatibility.

Fields that will be configured if non-existant:

- `name`,
- `version`,
- `scripts.build`,
- `files`,
- `type`,
- `main`,
- `module`,
- `types`,
- `exports`
- `ts-pack`

### Doctor

Help setup `package.json` the right way, the first time! Doctor will help guide through the set up and identify missing properties.

For an [NPM](npmjs.com) library, package.json is **the** informer of what your library is, and how your library operates. Doctor is there to cover the bases for 80% of use-cases.

> Multiple modules are currently not supported, see [Roadmap](#roadmap) for more information.

Example terminal output from Doctor:

```
🩺 Running TS-Pack: Verifying Package.json...

ES Module Package Detected

 ○ - Exports Common JS

While optional for ES Module Packages, this choice can break environments who haven't adopted ESM yet.

 ✓ - Exports ES Module
 ✓ - Exported ES Module Correct File Extension
 ○ - Exports Types for developers

Exporting types, while optional, aid developers who consume your library.
Add "types": "<dist folder>/<@types folder>/index.d.ts" to give them a hand!

 ✓ - Limited files packaged on release
 ✓ - Additional bundler support - Root
 ✓ - Additional bundler support - Root ES Modules

📦 Verifying TS-Pack Config...

 ○ - Input file configured

TS-Pack is using a default configuration for it's input file (src/index.ts)

 ○ - Typescript configured

TS-Pack is using a default configuration for it's typescript (tsconfig.json)

 ✓ - Input file found
 ✓ - tsconfig file found
```

### Build

Create bundles determined by properties present in `package.json` with help from a custom `pack` property or script flags.

#### Notable Properties

- `main` : CommonJS bundle.
- `module` : ES Module bundle.
- `types` : Type declaration bundle.

#### Pack configuration

If you want to persist configurations without using flags, custom `package.json` options are available.

- `pack.inputFile` : Single entry point file.
- `pack.tsConfig` : Specify a tsconfig.json file to use for bundling.
- `pack.bundle` : Include external dependencies in the minified output bundle.
- `pack.exclude` : Ensure packages, regardless of presence in `package.json` are always excluded.

## Roadmap

1. Enable Watch mode.

2. Support React 18's Server Side Components' "use client" directive.

3. Enable multiple inputs for libraries which export more than one module.

Many libraries have multiple named modules exported to either reduce size or complexity as an 'opt-in' measure. This is enabled through the `"exports"` property in package.json.
