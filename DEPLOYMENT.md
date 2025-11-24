# Guia de Deploy: Arsenal Brasil

Este guia vai te ajudar a colocar seu site no ar usando **GitHub** e **Vercel**. Como você está aprendendo, vamos fazer isso bem passo a passo.

## Pré-requisitos
- Uma conta no [GitHub](https://github.com/).
- Uma conta na [Vercel](https://vercel.com/).

---

## Passo 1: Criar o Repositório no GitHub

Como você não tem o programa do GitHub instalado no computador, vamos criar pelo site.

1.  Acesse [GitHub - Novo Repositório](https://github.com/new).
2.  **Repository name** (Nome do repositório): Digite `arsenal-brasil` (ou o nome que preferir).
3.  **Public/Private**: Escolha se quer que o código seja Público (todos veem) ou Privado (só você vê).
4.  **IMPORTANTE:** Deixe as opções "Add a README file", ".gitignore" e "license" **DESMARCADAS**. (Nós já criamos esses arquivos no seu computador).
5.  Clique no botão verde **Create repository**.

## Passo 2: Enviar seu Código para o GitHub

Agora que o "espaço" foi criado no GitHub, precisamos enviar os arquivos do seu computador para lá.

1.  Na página que abriu após criar o repositório, procure a seção que diz:
    **"…or push an existing repository from the command line"**
    *(...ou envie um repositório existente pela linha de comando)*

    **Eu já configurei o link para você!** Agora você só precisa enviar os arquivos.

2.  Copie e rode este comando no seu Terminal:

    ```bash
    git push -u origin main
    ```

3.  **Cole** o comando e aperte **Enter**.

> **Nota:** O GitHub pode pedir sua senha ou autenticação. Se pedir, siga as instruções na tela para fazer login.

Se tudo der certo, você verá mensagens de "Compressing objects", "Writing objects" e no final algo como "Branch main set up to track remote branch main".

---

## Passo 3: Colocar no Ar com a Vercel

Agora que o código está no GitHub, a Vercel vai pegar ele de lá e colocar na internet.

1.  Acesse o [Painel da Vercel](https://vercel.com/dashboard).
2.  Clique no botão **"Add New..."** (Adicionar Novo) e selecione **"Project"** (Projeto).
3.  Na tela "Import Git Repository", clique em **"Continue with GitHub"**.
4.  Você verá uma lista dos seus repositórios. Procure o `arsenal-brasil` e clique no botão **"Import"**.

### Configuração (Muito Importante)

Na tela de configuração que abrir:

1.  **Framework Preset:** A Vercel deve detectar automaticamente como **Vite**. Se não, selecione "Vite".
2.  **Root Directory:** Deixe como está (`./`).
3.  **Environment Variables** (Variáveis de Ambiente):
    *   Clique para expandir essa seção.
    *   Precisamos adicionar a chave da Inteligência Artificial aqui para ela funcionar no site online.
    *   **Name:** Digite ``VITE_API_KEY
    *   **Value:** Cole a sua chave da API do Google Gemini (a mesma que está no seu arquivo `.env` no computador).
    *   Clique em **Add**.

4.  Clique no botão **"Deploy"**.

A Vercel vai começar a construir seu site. Espere uns minutos. Quando terminar, a tela vai explodir confetes e você terá um link (ex: `https://arsenal-brasil.vercel.app`) para acessar seu site de qualquer lugar!
