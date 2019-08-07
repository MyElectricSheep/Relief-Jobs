How to install the Relief Jobs app ?

# shell commands:

```
npm i -g psql
createdb reliefjobs
psql reliefjobs
```

# PSQL shell:

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

> Then launch the init SQL file to iniate the database with a user table:

```
\i [your computer's root path...]/reliefJobs/packages/server/scripts/postgresql/init.sql
```

# Add the following to your computer's AWS credentials files

> This file is located in ~/.aws/credentials for Linux, Unix, and macOS

```
[reliefjobs]
aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>
```
