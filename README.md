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

Para executar o projeto há 2 maneiras:

- **🧑‍💻 Modo desenvolvedor:** Esse modo consistem em iniciar o 2 servidores (servidor do `Flask` e servidor do `React`). Assim é possível realizar alterações ao mesmo tempo;
- **🐋 Modo deploy com `Docker`:** Esse é quando o projeto está finalizado e não precisa de alterações e já está pronto para produção;

> [!IMPORTANT]
> O projeto usa `Flask` e `React`, ou seja, é necessário ter o `Python` e o `Node` instalados

### 🧑‍💻 Modo desenvolvedor

1. **Clone o repositório**

    ```git
    git clone https://github.com/Davi-1903/CubeTime.git
    cd CubeTime
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
    DATABASE_URI="mysql+pymysql://root<SENHA?>@localhost<PORTA>/db_cubetime"
    ```

5. **Inicie ambos os servidores**

    ```bash
    # Backend
    cd ../server
    python app.py

    # Frontend
    cd ../client
    npm run dev
    ```

> [!TIP]
> Use ambiente virtual 😉

Se tudo ocorrer bem, a aplicação iniciará em seu navegador padrão e rodando em [`http://localhost:3000`](http://localhost:3000)

### 🐋 Modo deploy com `Docker`

1. **Clone o repositório**

    ```git
    git clone https://github.com/Davi-1903/CubeTime.git
    cd CubeTime
    ```

2. **Crie e inicie o `contâiner Docker`**

    ```bash
    docker compose up -d
    ```

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:3000`](http://localhost:3000)

---

## ⚖️ Licença

Esse projeto foi feito exclusivamente para estudo `React`, `Flask` e a integração entre ambas as tecnologias.

- [Licença MIT](LICENSE)
