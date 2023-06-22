require("express-async-errors")
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")

// executa o banco de dados
migrationsRun()

// inicializa o express que ajuda a utilizar requisisiçoes http
const app = express()
// diz como sera o formato da requisiçao
app.use(express.json())
// inicializa todas as rotas da api
app.use(routes)

app.use((error, request, response, next) =>{
  // tratamento de error caso seja outros erros, Ex: erro por n ter nome, erro por nao ter email, etc
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  
  console.error(error)
  // tratamento de erro caso seja erro do servidor, ou seja, algo erro no codigo
  return response.status(500).json({
    status: "error",
    message: "Internal server error!",
  })
})

// metodo listen que mostra qual porta está sendo utilizada no server
const PORT = 3333
app.listen(PORT, () => console.log(`Food Explorer Server is running on Port ${PORT}`))


// instaalr knex com npm install knex --save para configurar querys e migrations no banco de dados
// npx knex init para criar arquivo knex
// npm é um gerenciador de instalçao de pacotes para node e tambem utilizado para executar scripts e bibliotecas instaladas da api
// npx executador de pacotes npm que pode executar qualquer pacote do registro npm sem sequer instalar esse pacote
// npm install jsonwebtoken para instalar biblioteca de geração de tokens durante as requisições http
