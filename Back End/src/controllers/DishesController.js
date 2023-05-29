const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class DishesController{
    async create(request, response){
      const { name, price, description, category, ingredients } = request.body
      const { user_id } = request.params

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
      const { name, user_id, ingredients } = request.query

      let dishes

      if(ingredients){
        // usa concatenação pra transformar um texto em vetor para o filtro de pesquisa
        const filterIngredients = ingredients.split(',').map(ingredients => ingredients.trim())
        
        dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.user_id",
          "dishes.price",
          "dishes.description",
          "dishes.category"
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}%`) 
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name")
      }else{
        dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
      }

      const userIngredients = await knex("ingredients").where({ user_id })
      const dishesWithIngredients = dishes.map(dish => {
        const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id)
      
        return {
          ...dishes,
          ingredients: dishIngredients
        }
      })

      return response.json(dishesWithIngredients)
    }
  }
  
  module.exports = DishesController

  // "note-id : id" = note_id = id