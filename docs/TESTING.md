# Guia de Testes

## Testes Manuais

### Funcionalidades
- [ ] Navegação entre páginas
- [ ] Menu hambúrguer em mobile
- [ ] Formulário de contato
- [ ] Links externos (WhatsApp)
- [ ] Responsividade em diferentes telas

### Performance
- [ ] Tempo de carregamento
- [ ] Tamanho dos arquivos
- [ ] Score no Lighthouse

### Acessibilidade
- [ ] Navegação por teclado
- [ ] Leitores de tela
- [ ] Contraste de cores

### SEO
- [ ] Meta tags
- [ ] Sitemap
- [ ] Robots.txt

## Ferramentas de Teste

### Online
- Google PageSpeed Insights
- Lighthouse
- WAVE Accessibility
- GTmetrix

### Navegadores
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

### Dispositivos
- Teste em mobile real
- Emuladores de dispositivos
- BrowserStack

## Testes Automatizados

### Futuras Implementações
- HTML validation
- CSS linting
- JS linting
- Visual regression tests

### Scripts Sugeridos

```bash
# Validar HTML
curl -s "https://validator.w3.org/nu/?doc=https://SEU_SITE.com/" | grep -i error

# Verificar links quebrados
linkchecker https://SEU_SITE.com/

# Testar performance
lighthouse https://SEU_SITE.com/ --output json --output-path report.json
```

## Checklist de Lançamento

- [ ] Testado em Chrome, Firefox, Safari, Edge
- [ ] Testado em mobile e desktop
- [ ] Score Lighthouse > 90
- [ ] Sem erros no console
- [ ] Links funcionais
- [ ] Formulários funcionando
- [ ] SEO validado