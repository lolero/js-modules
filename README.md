# js-modules

## Overview
JS Modules monorepo - A library and application repository where all 
necessary components and services required for production-ready full-stack 
applications are designed and implemented.

## Technology stack
This [monorepo](https://monorepo.tools/#what-is-a-monorepo) is designed to 
primarily contain TypeScript code. However, packages can also be developed 
in JavaScript and Solidity.

## Requirements
- [nvm](https://github.com/nvm-sh/nvm) (Use the latest version number found 
  [here](https://github.com/nvm-sh/nvm/releases)
  in the command below where it reads `<nvm version>`)
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v<nvm version>/install.
sh | bash
```
- [Node.js 18.17.0 or later](https://nodejs.org/en/)
```shell
nvm install 18
```
- [pnpm](https://www.pnpm.io/)
- [nodemon](https://nodemon.io/)
- [ts-node](https://github.com/TypeStrong/ts-node)
```shell
npm install -g pnpm nodemon ts-node -y
```

## Getting started

### Bootstrap
To install all packages' dependencies and bootstrap the monorepo, run the 
following command in the terminal, from the project's root directory:
```shell
pnpm reset:reset
```

### Build
To build all packages for production, run the following command in the 
terminal, from the project's root directory:
```shell
pnpm lerna:build
```

### Execute package scripts
There are two ways to execute a package's `package.json` script:
1. Open a terminal, navigate to the package's root directory and execute 
   `pnpm <script name>`
2. Open a terminal in the monorepo's root directory and execute `pnpm 
   --filter <package name> <script name>`

## Monorepo
As stated in [monorepo.tools](https://monorepo.tools/#what-is-a-monorepo), 'a 
monorepo is a single repository containing multiple distinct projects, with 
well-defined relationships.'

While there may be different interpretations for 'well-defined', the term 
often implies not only separation and organization of code but also strict 
encapsulation which is the case for this monorepo. Strict encapsulation 
means that if `package_1` consumes a type, variable or function from 
`package_2`, it must always import it by adding `package_2` to the 
dependencies of `package_1`'s `package.json`.

Just to be clear, **NO script should import anything from a different package 
using a relative path!**

Building up on the concept of 'well-defined' relationships, defining the 
nature of packages is also important. In this monorepo, **any given package 
can be in only one of the following two categories**:

- Library: A package that exports one or more artifacts, which are consumed 
  by other packages
- App: A package that builds into an application to be executed in a 
  production runtime

**No package should do both of these things!** 

## Setup

### package.json
The monorepo implements a hierarchical structure of `package.json` files. 
The root `package.json` contains a set of scripts to bootstrap, lint, test 
and build all packages. It also contains common dependencies and configs.

Each package's `package.json` inherits from the `package.json`s in its 
parent directories and can include additional dependencies and/or 
configurations required for the package's specific purpose. 

#### Scripts
There are several scripts in the root `package.json` of the monorepo:
```shell
pnpm clean:main # Remove node_modules, build and coverage directories, as well as .husky and .ignore files
```
```shell
pnpm clean:tsbuildinfo # Remove .tsbuildinfo files
```
```shell
pnpm clean:graph # Remove dependency-graph files
```
```shell
pnpm clean:lock-files # Remove package manager lock files 
```
```shell
pnpm clean:git-hooks # Disable husky git hooks
```
```shell
pnpm reset:clean # Run the clean:main & clean:tsbuildinfo scripts
```
```shell
pnpm reset:install # Create symbolic links to .gitignore for libraries that use .ignore files
```
```shell
pnpm reset:reset # Run the reset:clean & reset:install scripts
```
```shell
pnpm git-hooks:set # Configure and enable husky git hooks
```
```shell
pnpm git-hooks:reset # Run the git-hooks:clean & git-hooks:set scripts
```
```shell
pnpm test:test # Run all tests in the monorepo
```
```shell
pnpm test:watch # Automatically run tests when relevant code is changed
```
```shell
pnpm test:coverage # Run all tests in the monorepo and generate a coverage report
```
```shell
pnpm lint:check # Check code for linting errors
```
```shell
pnpm lint:fix # Check code for linting errors and automatically correct errors when possible
```
```shell
pnpm graph:dependency-map # Generate dependency graph files
```
```shell
pnpm graph:package-tree # Print package tree to the terminal
```
```shell
pnpm lerna:build # Run the build script of all packages
```
```shell
pnpm prepublish # Run the lint:fix, test:coverage & lerna:build scripts
```

#### Dependencies
All dependencies of the root `package.json` are installed in all packages.

#### Config
The monorepo's root `package.json` contains configuration metadata for the 
following libraries, which are shared by all packages:

- eslintConfig
- prettier

Each package can extend and/or override the root configuration in their own 
`package.json`.

### tsconfig
The monorepo uses two separate TypeScript configuration files.

- `tsconfig.json` for development
- `tsconfig.build.json` for production

Just like with the `package.json` setup, there are the root `tsconfig`s and 
each package's `tsconfig`s.

#### Root `tscnfig`s
The root `tsconfig.json` extends the root tsconfig.build.json` and adds 
path aliases for all **library** packages whose artifacts, as explained above, 
are consumed by other packages.

These [path aliases](https://www.typescriptlang.org/tsconfig#paths) allow 
consumers of library artifacts to execute the raw TypeScript code, as they 
would if the artifact were imported using a relative path. Without path 
aliases, a library package must be compiled and published to the package 
registry so that consumer packages can install it as a dependency in their 
`node_modules` directory and consume the library's artifacts from there. This 
setup allows for the simultaneous development of different interrelated 
packages, without breaking encapsulation, while avoiding the drag of having to 
build and publish changes to library packages before said changes are 
propagated to their consumers.

#### Package `tsconfig`s
Unlike the root `tsconfig.json`, **a package's `tsconfig.json` does not extend 
the package's `tsconfig.build.json`**. Instead, a package's `tsconfig.json` 
extends the root `tsconfig.json` and its `tsconfig.build.json` extends the 
root `tsconfig.build.json`.

### Jest config
Unit testing of JavaScript and TypeScript code is carried out using
[Jest](https://jestjs.io/).

The testing configuration is set up with a hierarchy of config files, similar 
to the approach used for `package.json` and `tsconfig` described in the 
sections above.

- `jest.config.ts` is the root config for jest, which contains the 
  common config, shared by all packages, and enables testing for packages 
  where there is a
- `jest.config-project.ts` config in the package directory, which enables 
  Jest to execute tests in the package and allows it to extend and/or 
  override the root shared configuration for its purpose

### .ignore
The only `.ignore` that is actively maintained is `.gitignore`. All other
`.ignore`s are symbolic links, generated during the execution of the 
`reset:install` script when the project is bootstrapped. Hence, no `.ignore` 
file, aside from `.gitignore` should be edited manually.

## Package structure
All packages in the monorepo are organized in a directory structure, within 
the `packages` directory, with two levels.

The first level is one of the following general categories:

- `api`: Library packages whose artifacts' main purpose is to support 
  back-end/server features of packages in the `api` and/or `apps` categories
- `apps`: App packages and library packages that directly support said apps
- `common`: Library packages whose artifacts are consumed by packages in 
  more than one ot the other categories
- `web`: Library packages whose artifacts' main purpose is to support
  front-end web features of packages in the `web` and/or `apps` categories

The second level, inside the main categories, serves as a package 
subcategory and doesn't have to follow a strict nomenclature pattern.

The actual packages then go inside the subcategory directories and follow some 
basic guidelines for the sake of consistency:

- Package names are always prefixed as follows: 
  `<category>-<subcategory>-<package name>`, e.g. `api-nest-utils`, 
  `common-react-hooks` or `web-react-utils`.
- The only place with `index` files are used is in each package's `src` 
  directory. Everywhere else, files have meaningful names regardless of the 
  fact that import statements are slightly more verbose.
- All package artifacts are exposed in the package's `index.ts` mentioned in 
  the previous point.

## NestJS packages
***IMPORTANT Note**: NestJs always builds the app's code for production
before serving the API, regardless of whether the app is run in development or
production with the `nest start` or `nest build`, respectively. This means
that app packages which build [NestJs](https://docs.nestjs.com/) servers
don't use the root `tsconfig.json` path aliases. For this reason, when
changes are made in these packages' dependencies, the dependency packages
must be re-built as does the NestJs app package before said changes take
effect, even when the NestJs app is run with `nest start` in dev mode.

## Donate
I developed this project entirely in my free time and without monetary
retribution. You are welcome and encouraged to use it free of charge but if it
serves your purpose and you want to contribute to the project, any amount of
donation is greatly appreciated!

|                                                             Paypal                                                              |                                                                     BTC                                                                      |                                                                     ETH                                                                      |
| :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://paypal.me/pools/c/8t2WvAATaG"><img src="https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif"></a> | <img src="https://raw.githubusercontent.com/lolero/normalized-reducers-utils/master/readme-assets/btc-address.png" height="128" width="128"> | <img src="https://raw.githubusercontent.com/lolero/normalized-reducers-utils/master/readme-assets/eth-address.png" height="128" width="128"> |
|                                              https://paypal.me/pools/c/8t2WvAATaG                                               |                                                  bc1q7gq4crnt2t47nk9fnzc8vh488ekmns7l8ufj7z                                                  |                                                  0x220E622eBF471F9b12203DC8E2107b5be1171AA8                                                  |
