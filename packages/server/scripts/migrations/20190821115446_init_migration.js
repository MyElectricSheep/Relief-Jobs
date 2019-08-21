exports.up = knex => {
  return knex.schema
    .createTable("users", t => {
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
    })
    .createTable("jobs", function(t) {
      t.uuid("id")
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
      t.string("job_title", 512);
      t.text("job_description");
      t.text("how_to_apply");
      t.string("organization_name", 512);
      t.string("organization_code");
      t.enu("organization_type", [
        "academic_research",
        "government",
        "international_organization",
        "media",
        "NGO",
        "red_cross",
        "other"
      ]);
      t.enu("job_type", [
        "consultancy",
        "internship",
        "volunteer",
        "job",
        "part_time",
        "CDI", // French specific (permanent contract)
        "CDD", // French specific (fixed-term contract)
        "alternance", // French specific (apprenticeship)
        "service_civique", // French specific (civic service)
        "other"
      ]);
      t.enu("theme_type", [
        "agriculture",
        "disaster_management", // gestion crise & post-crise
        "water_sanitation_hygiene", // eau hygiene & assainissement
        "food_nutrition", // alimentation & nutrition
        "health", // santé
        "gender", // genre
        "climate_change_environment", // environnement & climat
        "peacekeeping_peacebuilding", // maintien de la paix
        "protection_human_rights", // protection & droits humains
        "recovery_reconstruction", // reconstruction
        "shelter_NFI", // abris & non-food items,
        "education", // education & formation
        "HIV_aids", // SIDA
        "mine_action", // action contre les mines et BASM
        "coordination",
        "safety_security", // sûreté & sécurité
        "migration",
        "lobbying_advocacy", // plaidoyer
        "economic_development", // développement économique & local
        "fair_trade", // commerce équitable
        "other" // autre
      ]);
      t.enu("career_type", [
        "administration_finance",
        "advocacy_communications",
        "donor_relations_grants_management",
        "human_resources",
        "information_communications_technology",
        "information_management",
        "logistics_procurement",
        "monitoring_evaluation",
        "program_project_management",
        "other"
      ]);
      t.enu("experience_type", [
        "0-2", // expressed in years
        "3-4",
        "5-9",
        "10+",
        "not_specified"
      ]);
      t.enu("location_type", [
        "unspecified",
        "remote",
        "roster",
        "country",
        "region",
        "world"
      ]);
      t.string("country", 3); // ISO 3166-1 alpha-3 - https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
      t.enu("region_type", [
        "central_africa",
        "eastern_africa",
        "northern_africa",
        "southern_africa",
        "western_africa",
        "middle_east",
        "central_asia",
        "east_asia",
        "south_east_asia",
        "south_asia",
        "pacific",
        "north_america",
        "caribbean",
        "central_america",
        "south_america",
        "europe"
      ]);
      t.string("city");
      t.json("links");
      t.boolean("duplicate");
      t.datetime("closing_date", { precision: 6 });
      t.integer("number_of_views");
      t.boolean("expired");
      t.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
      t.timestamp("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    })
    .table("users", t => {
      t.uuid("jobs_liked").unsigned();
      t.foreign("jobs_liked")
        .references("id")
        .inTable("jobs")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("jobs");
};
