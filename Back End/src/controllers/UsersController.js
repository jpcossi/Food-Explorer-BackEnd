const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response){
    const { name, email, password, isAdmin } = request.body
    
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso!")
    }
    
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ? , ?)",
    [name, email, password])
    
    return response.status(201).json() 
    /*if(!name){
      throw new AppError("Usuário não informado!")
    }
    //response.status(201).json({ name, email, password, isAdmin })
    */
  }
}

module.exports = UsersController








/* status mostra resposta do codigo hhtp sendo elas 100, 200, 300, 400 e 500 

1xx - informativo - a solicitação foi aceita ou o processamento continua em andamento
 -> 102 = precessando 
2xx - sucesso
 -> 200 = requisição bem sucedida
 -> 201 = criado - geralmente utiliando POST após uma inserção
3xx - redirecionamento
 -> 301 = movido permanentemente
 -> 302  = movido
4xx- erro do cliente:
 -> 400 = bad request
 -> 401 = unauthorized
 -> 404 = Not found 
5xx - erro  o servidor ao concluir a solicitação
 -> 500 - erro interno
*/