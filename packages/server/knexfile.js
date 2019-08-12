require("dotenv").config({ path: "./../../.env" });

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST_TEST,
      database: process.env.PGDATABASE_TEST,
      user: process.env.PGUSER_TEST,
      password: process.env.PGPASSWORD_TEST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/scripts/migrations"
    },
    seeds: {
      directory: __dirname + "/scripts/seeds"
    }
  },

  development: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/scripts/migrations"
    },
    seeds: {
      directory: __dirname + "/scripts/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/scripts/migrations"
    },
    seeds: {
      directory: __dirname + "/scripts/seeds"
    }
  }
};
