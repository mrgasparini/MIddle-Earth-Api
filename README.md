# Middle-Earth-API

Middle-Earth-API é uma aplicação NodeJs criada para o Desafio Desenvolvedor Backend na PlayerUm.

Middle-Earth-Front-End link: [Middle-Earth-Front-End](https://github.com/mrgasparini/Middle-Earth-Front-End.git)

## Objetivo

O objetivo do desafio é construir uma aplicação WEB que permita que usuários após a autenticação possam cadastrar lugares existentes no Senhor dos Anéis, subindo uma imagem e nome, e que possam votar em qual é o melhor lugar para se viver em MiddleEarth.

## Funcionalidades

Essa API tem como principal funcionalidade gerir acessos, controle de votos e CRUD dos lugares de Middle Earth.
Cada usuário só poderá votar apenas uma vez.
As funcionalidades de Votar, Cadastrar Lugar, Editar Lugar e Excluir lugar só poderam ser realizada quando o usuário estiver autenticado.

## Autenticação

No retorno do Request feito para a rota **auth/login** (Descrito no tópico **ROTAS**) será enviado um "token", o mesmo deverá ser enviado via headers da seguinte maneira **x-access-token: "token"**.

## Variáveis de Ambiente

Na raiz do projeto contém um arquivo com nome ".env-exemple", nele contém o exemplo de como dever ser criado o arquivo ".env", onde serão armazenadas todas as variáveis de ambiente.

## Configuração NGINX

Na raiz do projeto contém um arquivo com nome "nginx.conf", nele contém o arquivo de configuração NGINX utilizado para realizar o Proxy entre o Client-side e o Serve-side.

## Banco de Dados

A API está integrada com banco de dados MySQL. Na raiz do projeto contém um arquivo com nome "databaseScript.txt", nele contém todo o script para recriar o banco de dados no qual a API foi baseada.

## Instalação

Para instalar as depenências basta rodar o seguinte comando no terminal na pasta raiz do projeto.

```bash
npm i
```

## Start

Para iniciar o projeto basta rodar o seguinte comando no terminal na pasta raiz do projeto:

```bash
node app.js
```

## Rotas

### Status-Health

**GET** /status-health/ - Endpoint para checar se a API está funcionando normalmente. Caso a API esteja funcinando normalmente será retornado o seguinte objeto JSON:
```json
{    
   "status":"ok"
}
```

### Auth
**POST** /auth/login - Endpoint para validação do usuário, o seguinte objeto deverá ser enviado via body:

```json
{
   "username": "",
   "password": ""
}
```

**PS: Esse endpoint retorna um token de autenticação que deverá ser enviado via header(Descrito no tópico 'Autenticação') para todos os endpoints que em sua descrição abaixo conter 'TOKEN NECESSÁRIO' ao lado de seu nome.** 

### User
**POST** /user/register - Endpoint para cadastro de usuários, o seguinte objeto deverá ser enviado via body:

```json
{
   "username": "",
   "password": "",
   "confirmPassword": ""
}
```

### Place
**POST** /place/register - **TOKEN NECESSÁRIO** - Endpoint para cadastro de lugares, o seguinte objeto deverá ser enviado via body:

```json
{
    "place": {
        "id": 0,
        "name": "",
        "photo": "",
        "photoType": "URL",
        "photoUrl": ""
    }
}
```
**PS:** Como valor a ser enviado para a propriedade 'photoType' só serão aceitos os valores 'IMG' ou 'URL'.

**PS 2:**  Como valor a ser enviado para a propriedade 'photo' deverá ser o arquivo imagem convertido para BASE64.


**POST** /place/update - **TOKEN NECESSÁRIO** - Endpoint para edição de lugares, o seguinte objeto deverá ser enviado via body:

```json
{
    "place": {
        "id": 0,
        "name": "",
        "photo": "",
        "photoType": "URL",
        "photoUrl": ""
    }
}
```
**PS:** Como valor a ser enviado para a propriedade 'photoType' só serão aceitos os valores 'IMG' ou 'URL'.

**PS 2:** Como valor a ser enviado para a propriedade 'photo' deverá ser o arquivo imagem convertido para BASE64. 


**DELETE** /place/delete/:id - **TOKEN NECESSÁRIO** - Endpoint para exclusão de lugares, o **ID** do lugar a ser excluido deverá ser enviado via URL.

**GET** /place/ - Endpoint para buscar todos os lugares cadastrados.


### Vote
**POST** /vote/register - **TOKEN NECESSÁRIO** - Endpoint para cadastro de votos, o seguinte objeto deverá ser enviado via body:

```json
{
    "placeId": 0
}
```
**PS:** O registro de qual usuário está realizando o voto é feito atravez da autenticação do TOKEN enviado via header.

**GET** /vote/ - Endpoint para coletar todos os votos, nenhum parametro necessário a ser enviado.

**GET** /vote/user - **TOKEN NECESSÁRIO** - Endpoint para coletar o voto do usuário logado no sistema, apenas o TOKEN necessita ser enviado via header.

**DELETE** /vote/delete/ - **TOKEN NECESSÁRIO** - Endpoint para exclusão de votos, apenas o TOKEN necessita ser enviado via header.

**PS:** O registro de qual usuário está realizando a solicitação é feito atravez da autenticação do TOKEN enviado via header.