exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users")
  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE")
  table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")

// com o onDelete(CASCADE) é possivel deletar igredientes caso apague o prato correspondente a ela 