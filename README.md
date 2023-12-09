# Pup Glam - Back-end

Back-end de uma rede social visado em contratar modelos pets!

## Sobre

Pup Glam é um aplicativo de navegador web com o qual você pode visualizar, curtir, comentar e entrar em contato com donos de pets super charmosos

## Como executar para desenvolvimento

1. Clone o repositório
2. Instale as dependências com `npm i`

```bash
npm i
```

3. Crie um banco de dados no postgres e conecte usando o `.env`

4. Agora só rodar um: `npm run dev`

```bash
npm run dev
```

## Rotas

`Cadastro` --> POST /signup

```bash
"name":"username",
"email":"teste@gmail.com",
"password": "teste123",
"confirmPassword":"teste123",
"cpf":"00000000000",
"phone":"000000000"
```

`Login` --> POST /signin

```bash
"email":"teste@gmail.com",
"password": "teste123"
```

`Cadastrar um cachorro` --> POST /createdog

```bash
"name": "Aphelios",
"breed": "Raça Ruim",
"age": 3,
"description": "Um cachorro muito fofo",
"hireable": true
```

`Criar uma publicação` --> POST /post

```bash
"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ87KISbGQ_Fsa_K5JbYODb2CCpFPnua59zw&usqp=CAU",
  "description": "Curtindo uma praia",
  "dog_id": 25
```

`Criar um comentário em um post` --> POST /post/comment/:postId

```bash
"text": "Só comendo mole nessa praia aí, né!"
```

`Curtir um post` --> POST /post/like/:postId

`Descurtir um post` --> DELETE /post/unlike/:postId

`Exibir todos os dogs do usuário` --> GET /alldogs

Objeto esperado:

```bash
{
 [
"dogs"
  {
"id": 25,
"name": "Aphelios",
"breed": "Raça Ruim",
"age": 3,
"description": "Um cachorro muito fofo",
"hireable": true,
"user_id": 13,
"name_tutor": "Kaio",
"phone": "981986765",
"email": "teste@gmail.com"
  }
 ]
}
```

`Exibir todos os likes de um post e quem curtiu ele` --> GET /post/likes/:postId

Objeto esperado:

```bash
{
"likesCount": "1",
"usersWhoLiked": [1]
}
```

`Exibir todos os posts` --> GET /post

Objeto esperado:

```bash
{
	"posts": [
		{
	"id": 12,
	"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ87KISbGQ_Fsa_K5JbYODb2CCpFPnua59zw&usqp=CAU",
	"description": "Curtindo uma praia",
	"created_at": "2023-12-09T14:48:03.531Z",
	"dog_id": 25,
	"dog_name": "Aphelios",
	"dog_age": 3,
	"dog_hireable": true
		}
	]
}
```

`Exibir cachorro por ID` --> GET /dogs/dogId

Objeto esperado:

```bash
{
"dog": {
	"id": 25,
	"name": "Aphelios",
	"breed": "Raça Ruim",
	"age": 3,
	"description": "Um cachorro muito fofo",
	"hireable": true,
	"user_id": 13,
	"name_tutor": "Kaio",
	"phone": "981986765",
	"email": "teste@gmail.com"
	}
}
```

`Exibir comentários de um post por ID` --> GET /post/comments/:postId

Objeto esperado:

```bash
{
"comments": [
	{
	"id": 5,
	"text": "Só comendo mole nessa praia aí, né!",
	"created_at": "2023-12-09T14:49:16.846Z"
	}
]
}
```

`Modificar o status de hireable do cachorro` --> PUT /dogs/:dogId/hiring

```bash
{
  "newStatus": true
}
```
