# Arquitetura do Projeto

## Estrutura de Arquivos

```
ctrlnexus/
├── index.html              # Página inicial
├── equipe.html             # Página da equipe
├── servicos.html           # Página de serviços
├── contato.html            # Página de contato
├── beneficios.html         # Página de benefícios
├── apresentacao.html       # Página de apresentação
├── sobre.html              # Página sobre
├── escopo.html             # Página de escopo
├── diferenciais.html       # Página de diferenciais
├── consideracoes.html      # Página de considerações
├── 404.html                # Página de erro 404
├── css/
│   ├── style.css           # CSS fonte
│   └── style.min.css       # CSS minificado
├── js/
│   ├── script.js           # JS fonte
│   └── script.min.js       # JS minificado
├── img/                    # Imagens otimizadas
├── docs/                   # Documentação
├── .github/                # GitHub Actions
├── .gitignore              # Arquivos ignorados
├── .gitattributes          # Configurações Git
├── CNAME                   # Domínio customizado
├── README.md               # Documentação principal
├── LICENSE                 # Licença
├── package.json            # Metadados
├── manifest.json           # PWA
├── sitemap.xml             # SEO
├── robots.txt              # SEO
├── humans.txt              # Informações
├── security.txt            # Segurança
└── .well-known/
    └── security.txt        # Segurança
```

## Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Build**: Nenhum (site estático)
- **Deploy**: GitHub Pages, Netlify, Vercel ou servidor próprio
- **Versionamento**: Git
- **CI/CD**: GitHub Actions

## Princípios

- **Simplicidade**: Site estático sem frameworks pesados
- **Performance**: CSS/JS minificados, imagens otimizadas
- **Acessibilidade**: WCAG 2.1 AA
- **SEO**: Meta tags, sitemap, robots.txt
- **Responsividade**: Mobile-first design
- **Manutenibilidade**: Código limpo e documentado