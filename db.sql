CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    uid INTEGER
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    uname VARCHAR(255),
    pword VARCHAR(255)
);