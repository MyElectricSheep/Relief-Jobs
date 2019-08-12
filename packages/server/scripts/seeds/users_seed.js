const Chance = require("chance");
const chance = new Chance();

const createFakeUser = () => ({
  email: chance.email(),
  username: chance.name(),
  phone_number: chance.phone(),
  password: chance.string({ length: 9 }),
  email_verified: chance.bool()
});

exports.seed = async function(knex) {
  const fakeUsers = [];
  const numberOfFakeUsers = 10;
  for (let i = 0; i < numberOfFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  // Deletes all existing entries
  await knex("users")
    .del()
    .then(async function() {
      // Inserts seed entries
      await knex("users").insert(fakeUsers);
    });
};
