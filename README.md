
# Projeto: prova_pratica_mazzafc

Este projeto consiste em uma aplicação full stack com front-end em **React (TSX)** e back-end em **.NET 8** utilizando **Entity Framework Core** para acesso a banco de dados SQL Server.

---

## Tecnologias Utilizadas

- **Front-end:** React (TSX), Node.js v22.4.1
- **Back-end:** ASP.NET Core 8
- **ORM:** Entity Framework Core
- **Banco de Dados:** SQL Server

---

## Estrutura da Solução

O projeto está organizado da seguinte forma:

```
prova-pratica-mazzafc
│
├── 01 Application
│   ├── prova-pratica-mazzafc.Host        -> Projeto principal de inicialização
│   └── prova-pratica-mazzafc.UI          -> Front-end em TSX
│
├── 02 Domain
│   ├── prova-pratica-mazzafc.Business    -> Lógica de negócio
│   ├── prova-pratica-mazzafc.Models      -> Modelos de domínio
│   └── prova-pratica-mazzafc.Util        -> Utilitários
│
├── 03 Infra
│   └── prova-pratica-mazzafc.Repository  -> Repositórios e persistência
│
├── 04 IOC
│   └── prova-pratica-mazzafc.Ioc         -> Injeção de dependência
│
├── Doc                                    -> Scripts SQL de criação do banco
└── prova-pratica-mazzafc.sln             -> Solução do Visual Studio
```

---

## Passos para Executar o Projeto

### 1. Configurar o Front-end

Acesse a pasta do front-end:

```bash
cd ~/prova-pratica-mazzafc/prova-pratica-mazzafc.UI
npm install
```

Isso instalará todas as dependências necessárias no `node_modules`.

---

### 2. Abrir e Configurar a Solução no Visual Studio

1. Abra o arquivo `prova-pratica-mazzafc.sln` localizado na raiz do projeto:
   ```
   ~/prova-pratica-mazzafc/prova-pratica-mazzafc.sln
   ```

2. Verifique se o projeto **`prova-pratica-mazzafc.Host`** está definido como **projeto de inicialização** (botão direito > Definir como projeto de inicialização).

3. Verifique o arquivo `appsettings.json` em `prova-pratica-mazzafc.Host` e confira a **Connection String**:
   - Confirme se ela aponta para o banco de dados correto (local ou servidor).

---

### 3. Banco de Dados

- O banco foi desenvolvido em **SQL Server**.
- A comunicação com a API é feita através do **Entity Framework Core**.
- Scripts de criação do banco estão na pasta:

```bash
~/prova-pratica-mazzafc/Doc
```

- Execute os scripts na ordem especificada nos arquivos para restaurar o banco de dados local.

---

### 4. Executar o Projeto

Após realizar todas as verificações e configurações:

- Pressione `F5` no Visual Studio para compilar e executar o projeto.

---

## Observações

- Certifique-se de que o SQL Server esteja rodando corretamente.
- Garanta que os scripts do banco foram executados com sucesso antes de iniciar a API.

---

### Autor

Desenvolvido para **Prova Técnica** da **MazzaFc** e **MinervaFoods**.

Documentação Gerada com ajuda de IA
Documentação validada por: **Guilherme Swerts** no dia **12/05/2025**