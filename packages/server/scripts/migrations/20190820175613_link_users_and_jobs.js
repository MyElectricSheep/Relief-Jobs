exports.up = function(knex) {
  return knex.schema.table("users", t => {
    t.uuid("jobs_liked").unsigned();
    t.foreign("jobs_liked")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.table("users", t => {
    t.dropColumn("jobs_liked");
  });
};
