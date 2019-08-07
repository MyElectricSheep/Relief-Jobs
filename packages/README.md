How to install the Relief Jobs app ?

# shell commands:

```
npm i -g psql
createdb reliefjobs
psql reliefjobs
```

# PSQL shell:

```
ALTER USER root WITH PASSWORD 'new_password';
```

> this new_password should be === to PGPASSWORD in the .env file)

```
\i [your computer's root path...]/reliefJobs/packages/server/scripts/postgresql/init.sql
```
