# QuickChat API 💬

Este projeto é o backend [QuickChat](https://github.com/Bruno2202/quickchat), projetado para fornecer funcionalidades de comunicação em tempo real e gerenciamento de conversas. Ele permite a troca de mensagens, criação de salas de chat e autenticação de usuários.

## Descrição Geral

A QuickChat API é uma API robusta e escalável desenvolvida para suportar aplicações de chat em tempo real. Seu principal objetivo é facilitar a comunicação instantânea entre usuários, gerenciar salas de conversas e persistir dados de chat de forma eficiente. Possui funcionalidades como:

*   **Comunicação em Tempo Real:** Envio e recebimento instantâneo de mensagens.
*   **Gerenciamento de Salas de Chat:** Criação e acesso a conversas específicas.
*   **Autenticação Segura:** Proteção de rotas e recursos através de JSON Web Tokens (JWT).
*   **Persistência de Dados:** Armazenamento de informações de chat e mensagens em um banco de dados NoSQL.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias principais:

*   **Node.js**: Plataforma de execução JavaScript assíncrona.
*   **TypeScript**: Superconjunto tipado de JavaScript que melhora a segurança e manutenibilidade do código.
*   **Express.js**: Framework web rápido e minimalista para Node.js, utilizado para construir a API RESTful.
*   **Socket.IO**: Biblioteca para comunicação bidirecional e em tempo real baseada em eventos.
*   **Google Firebase (Firestore)**: Banco de dados NoSQL baseado em nuvem para armazenamento de dados de chat e mensagens.
*   **JSON Web Token (JWT)**: Padrão para criação de tokens de acesso seguros para autenticação.
*   **Dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.
*   **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.
*   **TSX**: Ferramenta para executar arquivos TypeScript diretamente, sem compilação prévia, facilitando o desenvolvimento.

## Como Instalar e Rodar

Siga os passos abaixo para configurar e executar a QuickChat API em seu ambiente local:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

*   **Node.js**: [Download e Instalação](https://nodejs.org/en/download/)
*   **npm**: Geralmente vem com o Node.js.

### Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Bruno2202/quickchat-api.git
    cd quickchat-api
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Configuração do Ambiente (`.env`):**
    Crie um arquivo `.env` na raiz do projeto com suas credenciais do Firebase e a chave secreta JWT. Um exemplo está disponível em `.env.example`.

    ```env
    # Firebase Configuration (obtenha do console do Firebase)
    FIREBASE_API_KEY=sua_api_key
    FIREBASE_AUTH_DOMAIN=seu_auth_domain
    FIREBASE_PROJECT_ID=seu_project_id
    FIREBASE_STORAGE_BUCKET=seu_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
    FIREBASE_APP_ID=seu_app_id
    FIREBASE_MEASUREMENT_ID=seu_measurement_id

    # Chave Secreta para JWT (gerar uma string longa e aleatória)
    JWT_SECRET=sua_chave_secreta_jwt_bem_segura
    ```
    *   Para obter as credenciais do Firebase, acesse o Console do Firebase, selecione seu projeto, vá em "Configurações do projeto" (ícone de engrenagem) e na seção "Seus apps", clique em "Web" (se ainda não tiver um, adicione um novo app web). As configurações estarão lá.
    *   Para `JWT_SECRET`, gere uma string complexa para garantir a segurança dos seus tokens.

### Rodar a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático):

```bash
npm run dev
# ou yarn dev
```

A API estará rodando em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada para seguir princípios de separação de responsabilidades (SRP) e modularidade, facilitando a navegação e a manutenção:

```
.
├── src/
│   ├── bll/                  # Business Logic Layer: Contém a lógica de negócio e validações
│   │   ├── AuthBll.ts        # Lógica de autenticação
│   │   └── ChatBll.ts        # Lógica de gerenciamento de chats e mensagens
│   ├── config/               # Arquivos de configuração da aplicação
│   │   └── firebaseConfig.ts # Inicialização e configuração do Firebase
│   ├── controllers/          # Controladores da API: Lidam com requisições HTTP e delegam para a BLL
│   │   ├── AuthController.ts # Gerencia requisições de autenticação
│   │   └── ChatController.ts # Gerencia requisições de chat
│   ├── dal/                  # Data Access Layer: Interage diretamente com o banco de dados (Firestore)
│   │   └── ChatDal.ts        # Operações de CRUD para chats e mensagens
│   ├── middlewares/          # Middlewares Express para processamento de requisições
│   │   └── AuthMiddleware.ts # Middleware de autenticação JWT
│   ├── models/               # Modelos de dados (schemas) da aplicação
│   │   ├── ChatModel.ts      # Modelo para estrutura de um chat
│   │   ├── MessageModel.ts   # Modelo para estrutura de uma mensagem
│   │   └── UserModel.ts      # Modelo para estrutura de um usuário
│   ├── routes/               # Definição das rotas da API
│   │   ├── AuthRoutes.ts     # Rotas de autenticação
│   │   ├── ChatRoutes.ts     # Rotas de chat
│   │   ├── HealthRoutes.ts   # Rota de health check
│   │   └── index.ts          # Roteador principal que agrega todas as rotas
│   └── index.ts              # Ponto de entrada principal da aplicação (configuração do servidor, Socket.IO)
├── .env.example              # Exemplo do arquivo de variáveis de ambiente
├── package.json              # Metadados do projeto e lista de dependências
├── package-lock.json         # Versões exatas das dependências (gerado pelo npm)
└── tsconfig.json             # Configuração do compilador TypeScript
```

## Como Contribuir

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga estas diretrizes:

1.  **Fork** o repositório.
2.  Crie uma **branch** para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e **commit**-as com mensagens claras e descritivas.
4.  Certifique-se de que o código compile sem erros (`npm run dev`) e que as funcionalidades existentes não foram quebradas.
5.  Envie suas alterações para o seu fork (`git push origin feature/minha-feature`).
6.  Abra um **Pull Request (PR)** para a branch `main` deste repositório.

## Licença

Este projeto está licenciado sob a Licença ISC.

## Nota Final

Este README foi gerado automaticamente pelo [README.ai](https://github.com/Bruno2202/readme-ai).
