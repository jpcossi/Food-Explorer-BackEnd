const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const knex = require("../database/knex")
const AppError = require("../utils/AppError") 
const authConfig = require("../configs/auth")

class SessionsController {
  async create(request, response){
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    // email vailidation
    if(!user){
      throw new AppError("E-mail e/ou senha incorreta!", 401)
    }
    
    // password validation
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("E-mail e/ou senha incorreta!", 401)
    }

    const { secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    return response.json({user, token})
  }  
}

module.exports = SessionsController