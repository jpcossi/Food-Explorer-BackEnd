const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })
  
  return database
}

module.exports = sqliteConnection



// instalar sqlite com npm install sqlite3 sqlite --save
// usar --save para depedencias de produção
// sqlite3 é o drive que estabelece comunicação com banco de dados
// sqlite tem função de conectar
// path resolve problemas de direcionamento de pastas mesmo em ambiente difrenete e ja vem instalado no node, Ex: linux, windows
// filename é a propiredade que diz onde vai ser salvo o banco de dados
// __dirname pega o local atual do arquivo