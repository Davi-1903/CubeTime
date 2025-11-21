<div align='center'>
    <img
        src='client/public/assets/images/logo.svg'
        alt='Logo'
        loading='lazy'
    >
    <h1 style='margin-bottom: 2rem; border-bottom: none'>CubeTime</h1>
</div>

Sistema simples de cronometragem para tempos no cubo mágico com `React` + `Flask` + `MySQL`

## 💻 Como executar

1. **Clone o repositório**

    ```git
    git clone https://github.com/Davi-1903/CubeTime.git
    ```

2. **Instale todas as dependências**

    ```bash
    # Backend
    cd server
    pip install -r requirements.txt

    # Frontend
    cd ../client
    npm install
    ```

3. **Crie uma conexão em um banco de dados MySQL. Use o schema [`server/database/schema.sql`](server/database/schema.sql)**

4. **Crie um arquivo `.env` na raiz do projeto e adicione**

    ```.env
    SECRET_KEY="<CHAVE SECRETA>"
    DATABASE_URI="mysql+pymysql://root<SENHA?>@localhost<PORTA/db_cubetime"
    ```

5. **Inicie os 2 servidores para o desenvolvimento**

    ```bash
    # Backend
    flask run --debug

    # Frontend
    npm run dev
    ```

> [!TIP]
> Use ambiente virtual 😉

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:3000`](http://localhost:3000)
