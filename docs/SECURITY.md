# Segurança

## Medidas Implementadas

### Arquivos de Segurança
- `security.txt`: Contato para relatórios de vulnerabilidades
- `.well-known/security.txt`: Padrão IETF
- HTTPS obrigatório (configurar no servidor)

### Proteções
- Site estático reduz ataques server-side
- Sem bancos de dados expostos
- Headers de segurança (configurar no servidor)

## Recomendações

### Servidor
- Use HTTPS sempre
- Configure CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

### Monitoramento
- Monitore logs de acesso
- Use ferramentas de scanning de segurança
- Atualize dependências regularmente

## Relatórios de Segurança

Para reportar vulnerabilidades:
- Email: gdzconsultoria@outlook.com
- Use `security.txt` para contato oficial

## Checklist de Segurança

- [ ] HTTPS configurado
- [ ] Headers de segurança ativos
- [ ] Sem dados sensíveis expostos
- [ ] Formulários protegidos contra spam
- [ ] Certificado SSL válido
- [ ] Dependências atualizadas