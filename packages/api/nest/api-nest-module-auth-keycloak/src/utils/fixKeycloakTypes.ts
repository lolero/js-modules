import { existsSync, readFileSync, writeFileSync } from 'fs';

const KEYCLOAK_PACKAGE_JSON = 'node_modules/keycloak-js/package.json';

function fixKeycloakTypes(): void {
  if (!existsSync(KEYCLOAK_PACKAGE_JSON)) {
    throw Error(
      `Warning: keycloak-js package not found at ${KEYCLOAK_PACKAGE_JSON} /n Make sure to run this script after 'pnpm install'`,
    );
  }

  console.log('Found keycloak-js package.json, adding types field...');

  const packageJsonContent = readFileSync(KEYCLOAK_PACKAGE_JSON, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  console.log('Checking for "types": "./lib/keycloak.d.ts"');

  if (packageJson.types === './lib/keycloak.d.ts') {
    console.log('Types field already exists');
    return;
  }

  console.log('Adding missing types field...');
  packageJson.types = './lib/keycloak.d.ts';

  writeFileSync(
    KEYCLOAK_PACKAGE_JSON,
    `${JSON.stringify(packageJson, null, 2)}\n`,
  );

  console.log('Successfully added types field to keycloak-js package.json');
}

fixKeycloakTypes();
