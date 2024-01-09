const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class DishImageController {
  async update(request, response){
    const { id } = request.params
    const imageFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex("dishes").where({ id: id }).first()

    if(!dish){
      throw new AppError("Prato não existe!", 401)
    }

    if(dish.image){
      await diskStorage.deleteFile(dish.image)
    }    

    const filename = await diskStorage.saveFile(imageFilename)

    if(!filename){
      throw new AppError("Imagem não selecionada!", 500)
    }

    dish.image = filename

    await knex("dishes").update(dish).where({ id: id })

    return response.json(dish)
  }
}

module.exports = DishImageController