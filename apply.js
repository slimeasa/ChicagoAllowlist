# 🏙️ Chicago Roleplay — Site de Allow-List

Site de candidatura para allow-list do servidor FiveM Chicago Roleplay.  
Formulários são enviados automaticamente para um canal do seu Discord via Webhook.

---

## 🚀 Deploy no Vercel (passo a passo)

### 1. Suba o projeto para o GitHub
1. Crie um repositório no [GitHub](https://github.com/new) (pode ser privado)
2. Faça upload de todos os arquivos desta pasta para o repositório

### 2. Crie o Webhook no Discord
1. Abra o Discord e vá até o canal onde quer receber as candidaturas (ex: `#allow-list`)
2. Clique em **Editar Canal** → **Integrações** → **Webhooks** → **Criar Webhook**
3. Dê um nome (ex: `Chicago RP Allow-List`) e copie o **URL do Webhook**

### 3. Faça o deploy no Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New → Project**
3. Importe o repositório do GitHub
4. Antes de confirmar o deploy, vá em **Environment Variables** e adicione:
   - **Name:** `DISCORD_WEBHOOK_URL`
   - **Value:** *(o URL do webhook que você copiou)*
5. Clique em **Deploy** e aguarde ✅

---

## 💻 Rodar localmente

```bash
# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e cole o URL do seu webhook Discord

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

---

## ✏️ Personalizações comuns

| O que mudar | Onde mudar |
|---|---|
| Perguntas do formulário | `pages/index.js` → array `FIELDS` |
| Estatísticas (500+ membros etc.) | `pages/index.js` → seção `.stats` |
| Cores e fontes | `styles/globals.css` e `pages/index.module.css` |
| Idade mínima | `pages/index.js` (campo `min: 16`) e `pages/api/apply.js` |
| Campos do embed Discord | `pages/api/apply.js` → array `fields` |

---

## 📦 Stack

- **Next.js 14** (React)
- **CSS Modules** (zero dependências de UI)
- **Discord Webhooks** (recebimento das candidaturas)
- **Vercel** (hospedagem gratuita)
