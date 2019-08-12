DROP DATABASE IF EXISTS reliefjobs;
CREATE DATABASE reliefjobs;

\c reliefjobs;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP DATABASE IF EXISTS reliefjobs_tests;
CREATE DATABASE reliefjobs_tests;

\c reliefjobs_tests;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";