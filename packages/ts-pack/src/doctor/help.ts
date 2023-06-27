import pkgjson from '../../package.json' assert { type: 'json' }

export async function help() {
  console.info(`
  TS-Pack v${pkgjson.version}

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

    --watch, -w, ts-pack.watch
        Enter watch mode, where files saved in the source directory will trigger an automatic rebuild
        default: false
`)
}
