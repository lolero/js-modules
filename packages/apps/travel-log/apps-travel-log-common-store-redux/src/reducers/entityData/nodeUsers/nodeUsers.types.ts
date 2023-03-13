// TODO: create nodeUsersReducer
// TODO: create users api controller, secured by keycloak
// TODO: create a saga that takes the sigin success action and upserts the
//  authenticated user in the core db and puts the returned user in the
//  users reducer
// TODO: figure out a way to add phoneNumber and middleName to the keycloak
//  realm and a way to add them to the ID token.
// TODO: also figure out how to add email to the id token so the
//  users.service.checkin method can create the user records in the database
//  with an email address.
