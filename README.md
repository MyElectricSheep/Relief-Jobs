# 🌍👨‍🚒 Relief Jobs

This is an **discontinued** app created in late 2019 to:
- Scrape relief/humanitarian/ngo job websites data all over the web and aggregate them in a single place
- The front-end UI was based on [WelcomeToTheJungle](https://www.welcometothejungle.com/en/jobs)

![Relief Jobs](https://raw.githubusercontent.com/MyElectricSheep/Relief-Jobs/master/reliefjobs-search.png)

### 🎨 Front-end Tooling:
- [React](https://reactjs.org/)
- [MaterialUI](https://mui.com/) for the UI Library
- [React-intl](https://www.npmjs.com/package/react-intl) for the i18n setup
- [React-markdown](https://www.npmjs.com/package/react-markdown) to render markdown markup
- [React-spring](https://react-spring.io/) for the animation library
- [Lodash](https://lodash.com/) for the utilities 
 
### 🛠 Back-end Tooling:
- [Express](https://expressjs.com/) for the Node web minimalist framework
- [Puppeteer](https://github.com/puppeteer/puppeteer) for the web data scrapping
- [Knex](http://knexjs.org/) as the Query-Builder over a Postgres database
- [Aws-Sdk](https://www.npmjs.com/package/aws-sdk) to interact with the AWS services
- [Validator.js](https://www.npmjs.com/package/validator) for data validation
- [Node-cron](https://www.npmjs.com/package/node-cron) for the CRON jobs
- [Franc-min](https://www.npmjs.com/package/franc-min) for text language detection
- [Bcrypt](https://www.npmjs.com/package/bcrypt) / [JWT](https://jwt.io/) for the authentication/authorization flow
- [Chance](https://www.npmjs.com/package/chance) / [Faker](https://www.npmjs.com/package/faker) for the random data generation

### 🚀 Live version:

This app is discontinued and there is no live version available anymore.

**How to install the Relief Jobs app**

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

### Add the following to your computer's AWS credentials files

> This file is located in ~/.aws/credentials for Linux, Unix, and macOS

```
[reliefjobs]
aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>
```
