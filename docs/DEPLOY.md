# Guia de Deploy

## GitHub Pages

1. Vá para o repositório no GitHub
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: main, folder: /(root)
5. Save

O site será publicado em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`

## Netlify

1. Conecte sua conta GitHub ao Netlify
2. Selecione o repositório
3. Build command: (deixe vazio)
4. Publish directory: /
5. Deploy

## Vercel

1. Conecte sua conta GitHub ao Vercel
2. Importe o repositório
3. Configure como static site
4. Deploy

## Servidor Próprio

1. Faça upload dos arquivos para seu servidor web
2. Certifique-se de que o servidor suporta HTML/CSS/JS
3. Configure o domínio se necessário

## Domínio Customizado

Para usar um domínio customizado:

1. Adicione um arquivo `CNAME` com seu domínio
2. Configure o DNS do domínio para apontar para o host
3. Para GitHub Pages: adicione o domínio em Settings > Pages > Custom domain