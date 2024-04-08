const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response){
    const { name, email, password} = request.body
    
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    console.log(password)
    
    if(password.length < 6){
      throw new AppError("Senha mínima de seis caracteres!")
    }

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso!")
    }

    // hash é o metodo que criptografa senha ou outras variaveis
    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ? , ?)",
    [name, email, hashedPassword])
    
    return response.status(201).json() 
  }

  async update(request, response){
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
 
    if(!user){
      throw new AppError("Usuário não encontrado!")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    // verifica se o email ja esta sendo utilzado comparando ids do banco de dados
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está sendo utilizado!")
    }

    // Se o email ou nome não forem informados, será usado o nome/email já contidos no user.id
    user.name = name ?? user.name
    user.email = email ?? user.email

    // verifica se a senha usada anteriormente esta certa ou errada antes de mudar para a nova
    if(password && !old_password){
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha!")
    }
    /*
    if(password == old_password){
      throw new AppError("Voce não pode atualizar a senha com o mesmo conteúdo da antiga!")
    }*/

    if(password && old_password){
      // utiliza o metodo compare do bcrypt pois nao e possivar comparar coma  senha criptografada de forma normal
      const checkOldPassword = await compare(old_password, user.password)
      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere!")
      }
    }

    user.password = await hash(password, 8)

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?
      `,
      [user.name, user.email, user.password, user_id]
    )
  
    return response.status(200).json()
  }
}

module.exports = UsersController




// npm install bcryptjs para instalar biblioteca que criptografa senha no banco de dados

/* status mostra resposta do codigo hhtp sendo elas 100, 200, 300, 400 e 500 

1xx - informativo - a solicitação foi aceita ou o processamento continua em andamento
 -> 102 = precessando 
2xx - sucesso
 -> 200 = requisição bem sucedida
 -> 201 = criado - geralmente utiliando POST após uma inserção
3xx - redirecionamento
 -> 301 = movido permanentemente
 -> 302  = movido
4xx- erro do cliente:
 -> 400 = bad request
 -> 401 = unauthorized
 -> 404 = Not found 
5xx - erro  o servidor ao concluir a solicitação
 -> 500 - erro interno
*/