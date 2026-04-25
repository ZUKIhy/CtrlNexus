# Guia de Performance

## Otimizações Implementadas

### CSS e JS
- Arquivos minificados (`style.min.css`, `script.min.js`)
- CSS crítico inline (não implementado ainda)
- Lazy loading de imagens (não implementado)

### Imagens
- Otimizadas com compressão
- Formatos modernos (WebP não implementado)
- Responsive images (não implementado)

### Cache
- Headers apropriados (configurar no servidor)
- Service Worker para cache (não implementado)

## Métricas

Use ferramentas como:

- Google PageSpeed Insights
- Lighthouse
- WebPageTest

## Melhorias Futuras

- Implementar WebP
- Adicionar preload/prefetch
- Otimizar fonts
- Implementar CDN
- Compressão GZIP/Brotli