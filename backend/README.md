## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/)

## Dependências

- [cors](https://yarnpkg.com/en/package/cors)
- [dotenv](https://yarnpkg.com/en/package/dotenv)
- [express](https://yarnpkg.com/en/package/express)
- [mongoose](https://yarnpkg.com/en/package/mongoose)
- [multer](https://yarnpkg.com/en/package/multer)
- [socket.io](https://yarnpkg.com/en/package/socket.io)

## Como iniciar

Faça um clone desse repositório e acesse a pasta backend:

    git clone https://github.com/DouglasVarollo/OmniStack6.git
    cd OmniStack6/backend

Agora nós precisamos instalar as dependências, podemos usar o yarn:

    yarn
    // ou npm install

Antes de executar a aplicação nós precisamos configurar a URL de conexão do banco de dados MongoDB, copie o conteúdo do arquivo **.env.example** e crie um arquivo **.env** com a sua URL de conexão:

    MONGO_URI=mongodb://username:password@host:port/database

Para executar o servidor em modo de desenvolvimento nós usamos o comando:

    yarn dev
    // ou npm run dev

## Como Testar

Para testar a aplicação baixe e instale o [Insomnia](https://insomnia.rest/download/), importe os dados do arquivo **Insomnia_2020-01-21.json**.
