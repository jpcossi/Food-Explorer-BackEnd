const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()


const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)


module.exports = usersRoutes



// request obtem requisiçoes e response utiliza para a resposta 
// route params passa um parametro no endereço de rota
// metodo send envia resposta coomo mensagem na pagina
// metodo json envia resposta em formato JSON
// query params, Ex: "enderecodoservidor.com.br/users ?page=2&limit=10" => ? para dizer o nome do query; nome da query; sinal de igual pro valor; valor da query: & para passar outros valores 
// por padrao o navegador procura por metodo get
/*
Boa prática é ter no maximo 5 metodos em uma classe controller: 
index - GET para listar vários registros
show - GET para exibir um registro especifico
create - POST  para xcriar registro
update - PUT para atualizar umr egistro
delete - DELETE  para deletar 
*/ 