import pkgjson from '../../package.json' assert { type: 'json' }

export async function help() {
  console.info(`
  TS-Pack v${pkgjson.version}

  A preconfigured bundler using local package.json + tsconfig.json to bundle your library.

  Configurations via flags or package.json:
    --help, -h, pack.help
        Display this message

    --doctor, -d, pack.doctor
        Perform a check on package.json's configuration

    --init
        Writes to package.json a standard default setup for typescript libraries

    --tsConfig, -c, pack.tsConfig
        Specify the typescript config to use on build
        default: 'tsconfig.json'

    --inputFile, -i, pack.inputFile
        Specify the entry point to bundle.
        default: 'src/index.ts'

    --bundle, -b, pack.bundle
        Bundle dependencies in distribution.
        Useful for only relying on native node dependencies. i.e. lambdas
        default: false

    --preserveModules, -p, pack.preserveModules
        Preserved for future usage, currently does not affect bundling
        default: false

    --external, -e, pack.external
        Declare external packages when bundling. (Can be used multiple times)
        Useful when the runtime environment has modules additional to the core standard library. i.e. Lambdas 
        default: empty
`)
}
