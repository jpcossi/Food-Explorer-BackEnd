const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthemticated(request, response, next){
  // o token se encontra dentro de auhthorization que fica dentro do cabeçario(header)
  // o token se enontra com nome como "Bearer xxxxxxxx"
  const authHeader = request.headers.authorization
  
  if(!authHeader){
    throw new AppError("JWT Token não informado", 401)
  }

  // usa o split para separar o bearer do token
  const [, token] = authHeader.split(" ") 

  try{
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
    
    // insere o id na requisição depois de fazer a verificação caso o token é valido ou nao
    request.user = {
      id : Number(user_id),
    }
    return next()
  }catch{
    throw new AppError("JWT token inválido", 401)
  }
}

module.exports = ensureAuthemticated
