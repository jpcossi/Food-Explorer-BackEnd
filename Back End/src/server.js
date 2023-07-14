require("express-async-errors")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")
const migrationsRun = require("./database/sqlite/migrations")

const express = require("express")
const routes = require("./routes")
const cors = require ("cors")

// executa o banco de dados
migrationsRun()

// inicializa o express que ajuda a utilizar requisisiçoes http
const app = express()

//ajuda o backend a atender as requisiçoes do frontend
app.use(cors())

// diz como sera o formato da requisiçao
app.use(express.json())

//requisição get para mostrar arquivo
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

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

// npm install CORS(cross origin resource shared), biblioteca vai habilitar as requisiço~es do front end no backend 
// npm install axios, axios é uma biblioteca que trabalha com requisiçoes http como POST, GET e etc 