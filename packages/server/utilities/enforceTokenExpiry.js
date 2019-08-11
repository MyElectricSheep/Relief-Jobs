const database = require("../scripts/knex");

setInterval(async function enforceTokenExpiry() {
  await database
    .select("id", "token_creation_time")
    .from("users")
    .then(tokensCreationTime => {
      tokensCreationTime.map(entryTime => {
        // Convert UTC time to an integer to compare with current time
        const creationTimeInteger = parseInt(entryTime.token_creation_time);

        // Check if an hour has passed since the token was generated
        if (Date.now() > creationTimeInteger + 60000 * 60) {
          database
            .table("users")
            .where({ id: entryTime.id })
            .update({ token: null }) // Updates old tokens to null
            .then(res => res)
            .catch(err => err);
        }
      });
    })
    .catch(err => console.log(err));
}, 600000); // Runs every 10 minutes
