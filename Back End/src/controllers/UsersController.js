const AppError = require("../utils/AppError")

class UsersController {
  create(request, response){
  const { name, email, password, isAdmin } = request.body
  
  if(!name){
    throw new AppError("Usuário não informado!")
  }

  response.status(201).json({ name, email, password, isAdmin })
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