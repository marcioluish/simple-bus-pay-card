# Bus Pay Card APP

## Deploy
1 - Clone repository
```sh
$ git clone https://github.com/marcioluish/teste-fiesc.git
```

2 - Build application
```sh
$ docker-compose build backend frontend
```

2 - Docker up containers
```sh
$ docker-compose up -d
```
## Frontend
To access frontend:

`http://localhost:3000`

## Backend
Backend has 3 main routes:

URL: `http://localhost:8000/cards`

1) POST
Register a new card with a given value. Body example:

```
@value: str
{
    "value": "10"
}
```

2) GET
Retrieve card's balance. No body.

3) PUT
Recharge a card's balance. Body example:

```
@id: int
@value: str
{ 
    "id": 1,
    "value": ""
}
```
