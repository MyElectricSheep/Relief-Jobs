DROP DATABASE IF EXISTS reliefjobs;
CREATE DATABASE reliefjobs;

\c reliefjobs;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--users table
CREATE TABLE users (
    id uuid UNIQUE DEFAULT uuid_generate_v4(),
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    registered BIGINT,
    token VARCHAR(128) UNIQUE,
    createdTime BIGINT,
    emailVerified BOOLEAN,
    tokenUsedBefore BOOLEAN,
    PRIMARY KEY (email)
);