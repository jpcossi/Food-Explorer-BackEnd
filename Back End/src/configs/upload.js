const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){      
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`
      
      return callback(null, fileName)    
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}

//npm install multer para instalar a biblioteca que ajuda a fazer upload de imagens

// usa o crypto para os arquivos de upload terem nomes diferentes
// filehash criar um hexadecimal aleatorio 
// filename é o nome original junto com o filehash pros arquivos terem nomes diferentes