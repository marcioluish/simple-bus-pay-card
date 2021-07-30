# Teste Fiesc

## Deploy
1 - Faça o clone do repositório:
```sh
$ git clone https://github.com/marcioluish/teste-fiesc.git
```

2 - Faça o build da aplicação:
```sh
$ docker-compose build backend frontend
```

2 - Suba os containers
```sh
$ docker-compose up -d
```
## Frontend
Para acessar a aplicação:

`http://localhost:3000`

## Backend
O backend tem 3 rotas pertinentes aos cartões. 

URL: `http://localhost:8000/cards`

1) POST
Exemplo body:

```
@value: str
{
    "value": "10"
}
```

2) GET
no body

3) PUT
Exemplo body:

```
@id: int
@value: str
{ 
    "id": 1,
    "value": ""
}
```
