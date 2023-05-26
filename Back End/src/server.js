require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")

// inicializa o express que ajuda a utilizar requisisiçoes http
const app = express()
// diz como sera o formato da requisiçao
app.use(express.json())

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