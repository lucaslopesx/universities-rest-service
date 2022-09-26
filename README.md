
# REST API - Universidades

Este projeto se constitui em uma API contendo todos os métodos CRUD, utilizando NodeJS com Typescript, ExpressJs como framework WEB, MongoDB como banco de dados e o Prisma ORM.


## Stack utilizada

***Back-end:*** [Node](https://nodejs.org/en/), [Express](https://expressjs.com), [Prisma](https://www.prisma.io/)

***Banco de dados:*** [MongoDB](https://www.mongodb.com/docs/) 

## Instalação de depêndencias do servidor tendo como base o Ubuntu 20.04

NodeJS - Versão 16x-lts

```bash
  sudo apt install nodejs
```

NPM - Versão 8.x

```bash
  sudo apt install npm
```

Verifique a versão do NodeJS e NPM e caso necessário atualize-os.

## Instalação do projeto

Instale universities-rest-service com npm

```bash
  npm install
```
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL` - Contendo a string de conexão com seu banco de dados [MongoDB](https://www.mongodb.com/docs/)



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/lucaslopesx/universities-rest-service
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Documentação da API

#### Retorna todas as universidades

```http
  GET /universities
```

#### Retorna todas universidades de acordo com os parâmetro enviados 

```http
  GET /universities?country=${country}&page=${page}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `country`      | `string` | **Opcional**. O nome do pais que deseja buscar. Exemplo: Brazil, Uruguay |
| `page`      | `int` | **Opcional**. O numero da pagina que deseja buscar. Exemplo: 0, 1, 2 |


#### Retorna uma universidade com o id enviado

```http
  GET /universities/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O id do item que voce quer, no formato [ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) segundo a documentação do mongodb |


#### Cria uma universidade de acordo com os dados enviados no body da requisição

```http
  POST /universities
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `alpha_two_code`      | `string` | **Obrigatório**. Sigla do país com 2 caracteres |
| `web_pages`      | `string[]` | **Obrigatório**. Lista com as URL’s da universidade |
| `name`      | `string` | **Obrigatório**. Nome da universidade por extenso |
| `country`      | `string` | **Obrigatório**. Nome do país por extenso |
| `domains`      | `string[]` | **Obrigatório**. Lista de domínios da universidade |
| `state_province`      | `string` | **Opcional**. Sigla do estado onde fica a universidade se houver |

* Body example
```JSON
{
    "alpha_two_code": "BR",
    "web_pages": ["www.universidadefederal.edu.br"],
    "name": "Universidade federal de tecnologia",
    "country": "Brazil",
    "domains": ["federal.edu.br"],
    "state_province": "MG"
}
```

#### Cria uma universidade de acordo com os dados enviados no body da requisição

```http
  PUT /universities/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O id do item que voce quer, no formato [ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) segundo a documentação do mongodb |
| `web_pages`      | `string[]` | **Opcional**. Lista com as URL’s da universidade |
| `name`      | `string` | **Opcional**. Nome da universidade por extenso |
| `domains`      | `string[]` | **Opcional**. Lista de domínios da universidade |

* Body example
```JSON
{
    "web_pages": ["www.universidadefederal.edu.br"],
    "name": "Universidade federal de tecnologia",
    "domains": ["federal.edu.br"],
}
```

#### Remove a universidade com o id enviado

```http
  DELETE /universities/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O id do item que voce quer, no formato [ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) segundo a documentação do mongodb |
