const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage{
  async saveFile(file){
    // rename muda pasta de lugar, no caso da pasta "tmp" para pasta "uploads"
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }


  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    try{      
      await fs.promises.stat(filePath)
    }catch{
      return
    }
    //unlink deleta o arquivo
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage