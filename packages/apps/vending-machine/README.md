# Exercise brief

Design an API for a vending machine, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases. Your vending machine should only accept 5, 10, 20, 50 and 100 cent coins

**Tasks**

- REST API should be implemented consuming and producing “application/json”
- Implement product model with amountAvailable, cost, productName and sellerId fields
- Implement user model with username, password, deposit and role fields
- Implement an authentication method (basic, oAuth, JWT or something else, the choice is yours)
- All of the endpoints should be authenticated unless stated otherwise
- Implement CRUD for users (POST /user should not require authentication to allow new user registration)
- Implement CRUD for a product model (GET can be called by anyone, while POST, PUT and DELETE can be called only by the seller user who created the product)
- Implement /deposit endpoint so users with a “buyer” role can deposit only 5, 10, 20, 50 and 100 cent coins into their vending machine account
- Implement /buy endpoint (accepts productId, amount of products) so users with a “buyer” role can buy products with the money they’ve deposited. API should return total they’ve spent, products they’ve purchased and their change if there’s any (in an array of 5, 10, 20, 50 and 100 cent coins)
- Implement /reset endpoint so users with a “buyer” role can reset their deposit back to 0
- Create web interface for interaction with the API, design choices are left to you
- Take time to think about possible edge cases and access issues that should be solved

**Evaluation criteria:**

- Language/Framework of choice best practices
- Edge cases covered
- Write tests for /deposit, /buy and one CRUD endpoint of your choice
- Code readability and optimization

**Bonus:**

- If somebody is already logged in with the same credentials, the user should be given a message "There is already an active session using your account". In this case the user should be able to terminate all the active sessions on their account via an endpoint i.e. /logout/all
- Attention to security

# Solution

## Installation
- Run `pnpm install` at the root of the project.
- Run `docker-compose up` from the 
`js-modules/packages/apps/vending-machine/apps-vending-machine-api-core` 
directory to create the containers for the core and auth databases.
- Visit `http://localhost:8080/admin` and login with admin:admin credentials.
- From the keycloak admin dashboard, open the client-api-core client, go to 
  the credentials tab and copy the client secret to the keycloak 
  configuration used in `js-modules/packages/apps/vending-machine/apps
  -vending-machine-api-core/src/modules/app/app.module.ts`
- Run `pnpm typeorm migration:run` from the
  `js-modules/packages/apps/vending-machine/apps-vending-machine-api-core`
  directory to execute the migrations that create the users and product 
  tables on the core database.
- Build the local dependency packages required for 
  `apps-vending-machine-api-core` and `apps-vending-machine-web`.
- Run `pnpm dev` on both `apps-vending-machine-api-core` and `apps-vending-machine-web`.
- Visit `localhost:5173` on any browser and start using the vending machine app.
