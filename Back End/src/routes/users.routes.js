const { Router } = require("express")
const usersRoutes = Router()

usersRoutes.post("/", (request, response) =>{
  const { name, email, password } = request.body
 
  response.json({ name, email, password })
})

module.exports = usersRoutes




 // requisição GET para leitura
// requisiçao POST para registrar dados
// request obtem requisiçoes e response utiliza para a resposta 
// route params passa um parametro no endereço de rota
// metodo send envia resposta coomo mensagem na pagina
// metodo json envia resposta em formato JSON
// query params, Ex: "enderecodoservidor.com.br/users ?page=2&limit=10" => ? para dizer o nome do query; nome da query; sinal de igual pro valor; valor da query: & para passar outros valores 
// por padrao o navegador procura por metodo get