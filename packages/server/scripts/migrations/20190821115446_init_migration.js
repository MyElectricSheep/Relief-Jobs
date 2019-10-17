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
      t.string("title", 512);
      t.text("body");
      t.text("body_html");
      t.text("status");
      t.text("how_to_apply");
      t.text("how_to_apply_html");
      t.text("qualifications");
      t.text("qualifications_html");
      t.text("org_name");
      t.text("org_shortname");
      t.text("org_homepage");
      t.integer("org_code");
      t.enu("org_type", [
        "academic_research",
        "government",
        "international_organization",
        "media",
        "NGO",
        "red_cross",
        "other"
      ]);
      t.integer("org_type_id");
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
      t.integer("job_type_id");
      t.jsonb("theme_type");
      // Themes can be multiple. Json object is formatted as such:
      //   "theme": [
      //     {
      //         "name": "Food and Nutrition",
      //         "id": 4593
      //     },
      //     {
      //         "name": "Recovery and Reconstruction",
      //         "id": 4601
      //     }
      // ],
      t.jsonb("career_type");
      t.enu("experience_type", [
        "0-2", // expressed in years
        "3-4",
        "5-9",
        "10+",
        "not_specified"
      ]);
      t.integer("experience_type_id");
      t.json("country");
      // JSON object is formated as such:
      //   "country": [
      //     {
      //         "href": "https://api.reliefweb.int/v1/countries/31",
      //         "name": "Bangladesh",
      //         "location": {
      //             "lon": 90.27,
      //             "lat": 23.84
      //         },
      //         "id": 31,
      //         "shortname": "Bangladesh",
      //         "iso3": "bgd" // encoded in ISO 3166-1 alpha-3 - https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
      //     }
      // ],
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
        "europe",
        "not_specified"
      ]);
      t.text("salary");
      t.text("salary_html");
      t.string("city");
      t.text("source");
      t.text("language");
      t.json("links");
      t.json("files");
      t.json("org_logo");
      t.boolean("duplicate");
      t.datetime("original_posting_date", { precision: 6 });
      t.datetime("closing_date", { precision: 6 });
      t.integer("number_of_views");
      t.string("origin_source");
      t.string("origin_id");
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
