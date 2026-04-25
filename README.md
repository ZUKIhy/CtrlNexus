# ctrlNexus

Site institucional da ctrlNexus, focado em infraestrutura, segurança, cloud, backup, monitoramento e sustentação de ambientes de TI.

## Como rodar localmente

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

## Estrutura principal

- `index.html`: tela inicial
- `sobre.html`: apresentação institucional
- `servicos.html`: soluções da ctrlNexus
- `servico-*.html`: páginas individuais de cada solução
- `equipe.html`: equipe técnica
- `contato.html`: formulário, WhatsApp e canais de atendimento
- `css/style.css`: estilos principais
- `js/script.js`: interações, tema, menu e carrossel
- `img/`: imagens e logos do site

## Identidade e SEO

O projeto usa `manifest.json`, `sitemap.xml`, `robots.txt`, imagens otimizadas e metadados Open Graph para manter consistência de marca e melhorar indexação.

## FormSubmit

O formulário principal usa FormSubmit e define a URL de retorno automaticamente no navegador. Assim ele funciona tanto no domínio final quanto no GitHub Pages.

Na primeira submissão após publicar o site, o FormSubmit pode enviar um e-mail de ativação para o endereço configurado. É preciso confirmar esse e-mail uma vez para liberar os envios.

## Contato

- Site: https://ctrlnexus.com.br/
- Email: gdzconsultoria@outlook.com
- WhatsApp: +55 (17) 99136-2933
