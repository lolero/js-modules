INSERT INTO system_roles (name)
VALUES
    ('ADMIN'),
    ('SUPER_ADMIN'),
    ('USER');

INSERT INTO users (username, email, phone_number, password)
VALUES (
    'test_username_1',
    'test@email-1.com',
    '+18001111111',
    '4918f7eead223ce3.171753103f7880d36a8747d84b636d6462c3e5d03452d01c6a46fb209dc4f155' -- Test_Password_1!
);

INSERT INTO users__system_roles (user_id, system_role_id)
VALUES (1, 1), (1, 2), (1, 3);

-- DELETE FROM users WHERE id > 0
