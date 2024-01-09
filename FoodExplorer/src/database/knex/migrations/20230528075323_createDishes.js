
exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users")
  
  table.text("name")
  table.text("image").default(null)
  table.text("description")
  table.text("category")
  table.integer("price")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("dishes")