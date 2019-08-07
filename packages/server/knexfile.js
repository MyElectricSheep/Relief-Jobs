module.exports = {
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

  sandbox: {
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
