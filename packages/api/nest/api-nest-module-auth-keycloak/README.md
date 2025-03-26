Building this package may throw the following error

Cannot find module 'keycloak-js' or its corresponding type declarations

If that is the case the following field must be added to the package.json of 
the keycloak-js package inside node_modules, as explained here https://github.
com/keycloak/keycloak/issues/33778

"types": "./lib/keycloak.d.ts",