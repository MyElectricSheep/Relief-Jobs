const Chance = require("chance");
const chance = new Chance();
const bcrypt = require("bcryptjs");

const saltRounds = 12;

const getHashedPassword = async () => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(chance.string({ length: 10 }), saltRounds, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

const createFakeUser = async () => ({
  email: chance.email(),
  username: chance.name(),
  phone_number: chance.phone(),
  password: await getHashedPassword(),
  email_verified: chance.bool()
});

exports.seed = async function(knex) {
  const fakeUsers = [];
  const numberOfFakeUsers = 25; // How many users to seed the database with
  for (let i = 0; i < numberOfFakeUsers; i++) {
    fakeUsers.push(await createFakeUser());
  }
  // Deletes all existing entries
  await knex("users")
    .del()
    .then(async function() {
      // Inserts seed entries
      await knex("users").insert(fakeUsers);
    });
};
