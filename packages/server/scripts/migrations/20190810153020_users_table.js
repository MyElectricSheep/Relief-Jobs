exports.up = function(knex) {
  return knex.schema.createTable("users", function(t) {
    t.uuid("id")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("email", 128)
      .unique()
      .notNullable()
      .primary();
    t.string("password", 128).notNullable();
    t.bigInteger("registered");
    t.string("token", 128).unique();
    t.bigInteger("createdtime");
    t.boolean("tokenusedbefore");
    t.boolean("emailverified");
    t.string("reset_password_token", 128).unique();
    t.bigInteger("reset_password_expires");
    t.boolean("reset_password_token_used");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
