exports.up = function(knex) {
  return knex.schema.createTable("users", function(t) {
    t.uuid("id")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("email", 128)
      .unique()
      .notNullable()
      .primary();
    t.string("username", 128);
    t.string("phone_number", 128);
    t.string("password", 128).notNullable();
    t.bigInteger("registered");
    t.string("token", 128).unique();
    t.bigInteger("token_creation_time");
    t.boolean("token_used_before");
    t.boolean("email_verified");
    t.string("reset_password_token", 128).unique();
    t.bigInteger("reset_password_expires");
    t.boolean("reset_password_token_used");
    t.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    t.timestamp("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
