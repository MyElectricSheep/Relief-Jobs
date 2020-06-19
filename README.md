**How to install the Relief Jobs app ?**

# shell commands:

```
npm i -g psql knex
createdb reliefjobs
createdb reliefjobs_tests
psql reliefjobs
```

# PSQL shell (connected to database reliefjobs, repeat for reliefjobs_tests):

> A reliefjobsroot user is required, let's create one

```
CREATE USER reliefjobsroot WITH ENCRYPTED PASSWORD 'new_password';
```

> The new_password should be === to PGPASSWORD in the .env file)

```
GRANT ALL PRIVILEGES ON DATABASE reliefjobs TO reliefjobsroot;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO reliefjobsroot;
```

> If the reliefjobsroot user already exists, and you just need to update the password:

```
ALTER USER root WITH PASSWORD 'new_password';
```

> Then launch the init SQL file to initiate the database:

```
\i [your computer's root path...]/reliefJobs/packages/server/scripts/postgresql/init.sql
```

> Execute latest migrations to build the database (times 2 for the test db to be migrated as well)

```
knex migrate:latest
knex migrate:latest --env test
```

> Execute seed files to fill the databases with random data

```
knex seed:run
knex seed:run --env test
```

# Add the following to your computer's AWS credentials files

> This file is located in ~/.aws/credentials for Linux, Unix, and macOS

```
[reliefjobs]
aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>
```
...to complete
