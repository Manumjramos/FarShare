# FarShare

## Descrição Geral

O FarShare é um sistema web desenvolvido com o objetivo de fornecer informações confiáveis e acessíveis sobre pensão alimentícia, além de oferecer recursos interativos e educativos. O projeto conta com um backend em Node.js e um frontend estruturado em HTML, CSS e JavaScript puro.

O sistema inclui funcionalidades de cadastro e autenticação de usuários, edição e exclusão de conta, e um formulário de contato que envia mensagens por e-mail utilizando o serviço Nodemailer.

---

## Objetivos do Projeto

* Oferecer informações claras e organizadas sobre pensão alimentícia.
* Facilitar o acesso do usuário a conteúdos jurídicos de forma interativa.
* Implementar um sistema completo de login e cadastro.
* Aplicar boas práticas de desenvolvimento web e arquitetura cliente-servidor.

---

## Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express
* CORS
* Nodemailer
* MySQL

---

## Estrutura do Projeto

```
FarShare/
│
├── backend/
│   ├── server.js          # Servidor principal Node.js/Express
│   ├── sql.js             # Conexão com o banco de dados MySQL
│   ├── package.json       # Dependências e scripts do Node.js
│   └── package-lock.json
│
└── frontend/
    ├── banco.sql
    ├── biblioteca.html / .css
    ├── cadastro.html / .css
    ├── casos_reais.html / .css
    ├── glossario.html / .css
    ├── linha_do_tempo.html / .css
    ├── login.html / .css / .js
    ├── logo.html / .css
    ├── mitos_e_verdades.html / .css
    ├── pagina_de_perfil.html / .css / .js
    ├── primeira_pagina.html / .css / .js
    ├── quiz.html / .css
    ├── segunda_pagina.html / .css / .js
    ├── script.js
    └── style.css
```

---

## Configuração do Ambiente

### 1. Instalação das Dependências

Acesse a pasta `backend` e execute o comando:

```bash
npm install
```

### 2. Banco de Dados

Crie um banco de dados MySQL com o nome `farshare` e execute o script SQL contido no arquivo `banco.sql` localizado na pasta `frontend`.

Exemplo de estrutura:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);
```

Configure a conexão no arquivo `sql.js`:

```js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'farshare'
});

module.exports = connection;
```

### 3. Execução do Servidor

Dentro da pasta `backend`, execute:

```bash
node server.js
```

O servidor iniciará na porta 3001:

```
http://localhost:3001
```

### 4. Execução do Frontend

Abra o arquivo `index.html` (ou `primeira_pagina.html`) diretamente no navegador ou utilize o plugin **Live Server** do VS Code.

---

## Endpoints da API

| Método | Rota                   | Descrição                           |
| ------ | ---------------------- | ----------------------------------- |
| POST   | `/usuario/cadastrar`   | Cadastra um novo usuário            |
| GET    | `/usuario/listar`      | Lista todos os usuários cadastrados |
| PUT    | `/usuario/editar/:id`  | Atualiza os dados de um usuário     |
| DELETE | `/usuario/deletar/:id` | Exclui um usuário                   |
| POST   | `/login`               | Realiza login do usuário            |
| POST   | `/contato/enviar`      | Envia mensagem via e-mail           |

---

## Considerações de Implementação

* O envio de e-mails utiliza o serviço Gmail através de credenciais geradas por senha de aplicativo.
* Recomenda-se o uso de variáveis de ambiente (.env) para armazenar informações sensíveis.
* As rotas de autenticação não implementam criptografia de senha; recomenda-se o uso de `bcrypt` para produção.

---

## Autoria

**Autora:** Manuela Mena
**Projeto:** FarShare
**Ano:** 2025

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos e pode ser reutilizado para estudos e aprimoramentos mediante referência à autora.
