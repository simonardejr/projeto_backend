### Executando

#### 1. Faça o clone do projeto:

```
git clone https://github.com/simonardejr/projeto_backend.git
```

#### 2. Entre no diretório:

```
cd projeto_backend
```

#### 3. Copie o **.env.exemplo** e renomeie para **.env**

```
cp .env.exemplo .env
```

#### 4. Configure a conexão do mongo no arquivo `.env`

#### 5. Instale as dependencias do package.json

```
npm install
```

#### 6. Para executar:

```
npm run dev` ou `npm start
```
- - -

### Endpoints disponíveis

#### Pedidos
```
Lista de pedidos
GET /pedidos
```
```
Inserir novo pedido
POST /pedidos
{
    "nomeUsuario": "Simonarde",
    "lista": [
        {
            "idProduto": "6088b9af8a9987122c35259f",
            "quantidade": 2
        },{
            "idProduto": "6091f79b78f512036fa6d393",
            "quantidade": 1,
            "comentario": "Sem gelo"
        }
    ]
}
```
```
Informações de um pedido
GET /pedidos/<idPedido>
```
```
Deleta um pedido
DELETE /pedidos/<idPedido>
```

#### Produtos
```
Lista de produtos
GET /produtos
```
```
Inserir novo produto
POST /produtos
{
    "nome": "Yakissoba",
    "preco": 39.99,
    "descricao": "O melhor da cidade!",
}
```
```
Informações de um produto
GET /produtos/<idProduto>
```
```
Atualiza informações de um produto
PATCH /produtos/<idProduto>
{
    "nome": "Yakissoba",
    "preco": 49.50,
    "descricao": "O melhor da cidade! Mesmo!",
}
```
```
Deleta um produto
DELETE /produtos/<idProduto>
```
- - -


### Docker
Para rodar usando docker, siga os passos abaixo:
#### 1. Faça o build da imagem:

```
docker build -t nodejs_iesb .
``` 

***Obs.: não esqueça do ponto no final no comando acima***

#### 2. Rode o container:

```
docker run --rm -it --name node_iesb -v "$(pwd)":/app -p 3001:3001 nodejs_iesb npm run dev
```

***Obs.: troque a porta na flag -p para a porta que estiver usando no seu .env***

#### 3. Pronto!

O container vai executar o `npm run dev` e expor a api na porta que definiu no `.env`.

#### 4. Parando o container
Para parar o conatainer, digite: `docker stop node_iesb`
