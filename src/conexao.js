const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "gabriel",
    database: "market_cubos",
  },
});

module.exports = {
  knex,
};
