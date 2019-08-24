const database = require("../scripts/knex");

async function enforceTokenExpiry() {
  console.log("⏱️  Running tokens expiry check background job !");
  // Remove old Verify user tokens
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

  // Remove old Reset Password tokens
  await database
    .select("id", "reset_password_expires")
    .from("users")
    .then(resetPwdTokensCreationTime => {
      resetPwdTokensCreationTime.map(resetTime => {
        const creationTimeInteger = parseInt(resetTime.reset_password_expires);

        if (Date.now() > creationTimeInteger + 60000 * 60) {
          database
            .table("users")
            .where({ id: resetTime.id })
            .update({ reset_password_token: null })
            .then(res => res)
            .catch(err => err);
        }
      });
    })
    .catch(err => console.log(err));
}

module.exports = enforceTokenExpiry;
