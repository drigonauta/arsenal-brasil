# INSTRUÇÕES PARA CONFIGURAR A API KEY DO SR. NALL

## Passo 1: Obter a API Key do Google Gemini
1. Acesse: https://makersuite.google.com/app/apikey
2. Clique em "Create API Key"
3. Copie a chave gerada

## Passo 2: Configurar no Projeto
1. Abra o arquivo `.env` na raiz do projeto (ArsenalBrasil/.env)
2. Cole sua chave no formato:
   VITE_API_KEY=sua_chave_aqui

## Exemplo:
VITE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx

## Passo 3: Reiniciar o Servidor
Após salvar o arquivo .env, reinicie o servidor:
- Pressione Ctrl+C no terminal
- Execute: npm run dev

## IMPORTANTE:
- Nunca compartilhe sua API Key
- Não faça commit do arquivo .env no Git
- O arquivo .env já está no .gitignore

---

Se você não tem uma API Key, o Sr. Nall não conseguirá funcionar.
A API Key é GRATUITA para uso básico no Google AI Studio.
