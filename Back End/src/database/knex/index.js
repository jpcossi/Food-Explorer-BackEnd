const config = require("../../../knexfile")
const knex = require("knex")

// conexao do knex com o banco de dados
const connection = knex(config.development)

module.exports = connection


// npx knex migrate:make createDishes

// npx knex migrate:latest pra rodar a migration novamente ou o script npm run migrate