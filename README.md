# Food Explorer

Food Explorer é uma aplicação com front-end e back-end, utilizando as tecnologias JavaScript, Html, CSS, vite, React, Node e com banco de dados Sqlite e knex, axios, simulando um restaurante. Ele possui o layout de uma aplicação completa que vai desde a visualização de um prato até pesquisa, adição e edição, bem como a versão mobile do projeto.

O food explorer tem duas personas: o admin e o usuário;

O admin é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.


## Funcionalidades

Funcionais:
- Cadastro de usuários;
- Dois tipos de logins na tela principal: usuário e administrador;
- Visualização detalhada dos pratos;
- Pesquisa de pratos através dos ingredientes ou por nomes;
- Adição de pratos;
- Edição de pratos;
- Excluir pratos;
- Design único para Mobile; 

Em andamento: 
- Carrinho;
- Alterar informações de conta;
- Pratos favoritos;

### Cadastro de usuários
No FoodExplorer existe dois tipos de contas que são admin e usuário. Dentro da aplicação é possivel cadastrar apenas contas usuárias, já as contas admin devem ser criadas manualmente mudando a coluna "isAdmin" no banco de dados para true. A aplicação funciona dessa forma pois na prática ela necessita apenas de um administrador. 

Cadastro de usuários na aplicação: 

![App Screenshot](/screenshots/CadastroFoodExplorer.png)

### Dois tipos de logins na tela principal: usuário e administrador
Na aplicação existe duas entradas que são admin e usuário, ambas com funcionalidades diferentes dependendo de seu tipo. Admin pode criar, editar, excluir novos pratos enquanto o usuário apenas visualiza.  

Tela principal de um usuário na aplicação:

![App Screenshot](/screenshots/TelaPrincipalFoodExplorerUsuario.png)

Tela principal de um Administrador na aplicação:

![App Screenshot](/screenshots/TelaPrincipalAdminFoodExplorer.png)

### Visualização detalhada dos pratos
Ambas as contas podem visualizar pratos na aplicação mas suas telas principais e a página de visualização são levemente diferentes por conta de suas funcionalidades distintas.

Tela principal de um usuário:

![App Screenshot](/screenshots/TelaPrincipalSlidesUser.png)

Tela de visualização de um usuário:

![App Screenshot](/screenshots/TelaVisualizaçãoUser.png)

Tela principal de um Administrador:

![App Screenshot](/screenshots/TelaPrincipalSlidesAdmin.png)

Tela de visualização de um Administrador: 

![App Screenshot](/screenshots/VisualizaçãoPratoAdmin.png)

### Pesquisa de pratos através dos ingredientes ou por nomes
No menu da aplicação FoodExplorer contém uma barra de pesquisa que pode filtrar pratos criados pelo administrador por nome ou tag de um ingrediente.

Barra de pesquisa do menu: 

![App Screenshot](/screenshots/BarraPesquisaAdmiin.png)

Lista de pratos quando se recebe o resultado da barra de pesquisas:

![App Screenshot](/screenshots/ResultadoPesquisaAdmin.png)

### Adição de pratos
O Administrador tem como uma de suas funcionalidades adicionar novos pratos usando o link "Novo Prato" no menu inicial.

Link "Novo prato" no menu inicial:

![App Screenshot](/screenshots/LinkNovoPratoAdmin.png)

Página para adicionar novos pratos na conta administrador:

![App Screenshot](/screenshots/AdicionarPratoAdmin.png)

### Edição de pratos
O Administrador tem como uma de suas funcionalidades editar pratos já existentes usando o link de uma pincel nos slides na tela principal ou na tela de visualização de pratos.

Link para editar um prato:

![App Screenshot](/screenshots/LinkEditarAdmin.png)

Página para editar pratos na conta administrador:

![App Screenshot](/screenshots/EditarPratoAdmin.png)

### Excluir pratos
Dentro da página "Editar Pratos" mostrado anteriormente, é possivel exluir pratos já existentes na aplicação FoodExplorer.

Botão de excluir na página "Editar Pratos":

![App Screenshot](/screenshots/ExluirPratoAdmin.png)

### Design único para Mobile
A aplicação Food Explorer também contém responsividade e um design feito direcionado para mobile em sua estrutura com as mesmas funções só que vistas de forma diferente. Nesse design existe um menu diferente na conta administrador que tem as funcionalidades que foram explicadas anteriormente. 

Tela principal Administrador no mobile:

![App Screenshot](/screenshots/TelaPrincipalMobile.png)

Menu Inicial no Mobile:

![App Screenshot](/screenshots/MenuInicialMobile.png)

## Instalação

Instalação do vite (necessário node.js versão atualizada: https://nodejs.org/en)

```bash
  npm create vite@latest
```
## Rodando localmente

Clone o projeto

BackEnd do projeto
```bash
  git clone https://github.com/jpcossi/Food-Explorer-BackEnd.git
```

FrontEnd do projeto
```bash
  git clone https://github.com/jpcossi/Food-Explorer-FrontEnd.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Inicie o servidor

```bash
  npm run dev
```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/jpcossi)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jppcossi/)


## Stack utilizada

**Front-end:** React, Vite

**Back-end:** Node, Express
