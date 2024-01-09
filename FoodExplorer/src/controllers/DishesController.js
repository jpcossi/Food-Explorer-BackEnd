const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class DishesController{
  async create(request, response){
    const { name, price, description, category, ingredients } = request.body
    const user_id = request.user.id

    const [dish_id] = await knex("dishes").insert({
      name,
      price,
      description,
      category,
      user_id
    })

    const ingredientsInsert = ingredients.map(name =>{
      return {
        dish_id,
        name,
        user_id
      }
    })
      
    await knex("ingredients").insert(ingredientsInsert)

    return response.json()    
  }

    async update(request, response){
      const { name, price, description, category, ingredients } = request.body
      const { id } = request.params
      
      const database = await sqliteConnection()

      const dish = await database.get("SELECT * FROM dishes WHERE id = (?)", [id])
      
      const tags = await knex(("ingredients"))
      .where("dish_id", id)
      .orderBy("name")

      let newIngredients = []      
      let filterTagsDb

      for(let i = 0; i < ingredients.length; i++){       
        if(ingredients[i].name){
          filterTagsDb = await knex(("ingredients")).where("name", ingredients[i].name).where("dish_id", id)
          if(filterTagsDb.length === 0){
            newIngredients.push(ingredients[i].name)
          }                  
        }else{
          filterTagsDb = await knex(("ingredients")).where("name", ingredients[i]).where("dish_id", id)
          if(filterTagsDb.length === 0){
            newIngredients.push(ingredients[i])        
          }
        }
      }

      let deleteIngredients = []

      next: for(let i = 0; i < tags.length; i++ ){
        for(let w = 0; w < ingredients.length; w++){
          if(ingredients[w].name){
            if(tags[i].name === ingredients[w].name){
              deleteIngredients = deleteIngredients.filter(name => name !== tags[i].name)
              continue next 
            }else{
              deleteIngredients.push(tags[i].name)
            }
          }else{
            if(tags[i].name === ingredients[w]){
              deleteIngredients = deleteIngredients.filter(name => name !== tags[i].name)
              continue next 
            }else{             
              deleteIngredients.push(tags[i].name)
            }
          }          
        }
      }      
      
      if(!dish){
        throw new AppError("Prato não encontrado!", 401)
      }

      if(price === ""){
        throw new AppError("Voce precisa informar o novo preço!", 401)
      }
      
      if(name === ""){
        throw new AppError("Voce precisa informar o novo nome!", 401)
      }
      if(description === ""){
        throw new AppError("Voce precisa informar a nova descrição!", 401)
      }

      if(category === ""){
        throw new AppError("Voce precisa informar a nova categoria!", 401)
      }
      
      dish.name = name ?? dish.name
      dish.description = description ?? dish.description
      dish.category = category ?? dish.category
      dish.price = price ?? dish.price
      
      await database.run(`
        UPDATE dishes SET
        name = ?,
        description = ?,
        category = ?,
        price = ?,
        updated_at = DATETIME('now')
        WHERE id = ?
      `,
      [dish.name, dish.description, dish.category, dish.price, id]
      )
      
      if(newIngredients.length !== 0){
        const ingredientsInsert = newIngredients.map(name =>{
          return {
            dish_id : id,
            name: name,
            user_id : tags[0].user_id
          }
        })
        await knex("ingredients").insert(ingredientsInsert)
      }

      if(deleteIngredients.length !== 0 ){
        deleteIngredients.map(name =>{
          async function deleteTag(){
            const filterIngredientsDb = await knex(("ingredients")).where("name", name).where("dish_id", id)         
            if(filterIngredientsDb.length !== 0){
              await knex("ingredients").where({ id : filterIngredientsDb[0].id }).delete()
            }
          } 
          deleteTag()
        })
      }

      return response.status(200).json()
    }

    async show(request, response){
      const { id } = request.params

      const dish = await knex("dishes").where({ id }).first()
      const ingredients = await knex("ingredients").where({dish_id : id}).orderBy("name")
      
      return response.json({
        ...dish,
        ingredients
      })
    }

    async delete(request, response){
      const { id } = request.params

      await knex("dishes").where({ id }).delete()

      return response.json()
    }

    async index(request, response){
      const { name, ingredients } = request.query
      let user_id = request.user.id
      
      let dishes
      let dishesIngredients = []
      let dishesName = []      

      if(ingredients){
        // usa concatenação pra transformar um texto em vetor para o filtro de pesquisa
        const filterIngredients = ingredients.split(',').map(ingredients => ingredients.trim())
        user_id = 1
        dishesIngredients = await knex("ingredients")
          .select([
            "dishes.id",
            "dishes.name",
            "dishes.user_id",
            "dishes.image",
            "dishes.price",
            "dishes.description",
            "dishes.category"
          ])
          .where("dishes.user_id", user_id)
          .whereIn("ingredients.name", filterIngredients)
          .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
          .orderBy("dishes.name")
      }
        
        dishesName = await knex("dishes")
        .where({ user_id : 1 })
        .whereLike("name", `%${name}%`)
        .orderBy("name")

      if(dishesIngredients.length === 0){
        dishes = dishesName
      }else{
        dishes = dishesIngredients
      }

      const dishByRefeicao = dishes.filter(dish => dish.category === 'Refeições')
      const dishBySobremesa = dishes.filter(dish => dish.category === 'Sobremesas')
      const dishByBebidas = dishes.filter(dish => dish.category === 'Bebidas')

      let dishesByCategory =  [
        dishByBebidas,
        dishByRefeicao,
        dishBySobremesa,
        {dishByName: dishes}
      ]

      return response.json(dishesByCategory)
    }
  }
  
  module.exports = DishesController

  // "note-id : id" = note_id = id