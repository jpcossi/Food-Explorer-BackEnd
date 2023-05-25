const express = require("express")

const routes = require("./routes")

// inicializa o express que ajuda a utilizar requisisiçoes http
const app = express()
// diz como sera o formato da requisiçao
app.use(express.json())

app.use(routes)

const PORT = 3333

// metodo listen que mostra qual porta está sendo utilizada no server
app.listen(PORT, () => console.log(`Food Explorer Server is running on Port ${PORT}`))