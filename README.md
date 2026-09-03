# Chapa Azul

Site da Chapa Azul para apresentar propostas, responsáveis, eventos,
campeonatos, calendário, times, participação das turmas e opiniões dos alunos.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run lint
npm test
```

## Guia rápido de edição

Para instruções detalhadas, consulte o arquivo [`GUIA-DE-EDICAO.md`](./GUIA-DE-EDICAO.md).

O projeto foi separado por responsabilidade para facilitar alterações sem
misturar conteúdo, aparência e comportamento:

- `app/site-data.ts`: propostas, eventos, comentários, esportes, mídia,
  rankings, times e integrantes.
- `app/components/`: estrutura e textos de cada parte visível da página.
- `app/styles/`: aparência separada por seção.
- `app/site-interactions.ts`: cursor, animações, menu, modal e efeitos dos
  cartões. Altere este arquivo apenas para mudar comportamentos.
- `app/page.tsx`: conecta os componentes e mantém os estados interativos.

### Mapa dos estilos

| Arquivo | Controla |
| --- | --- |
| `00-base.css` | Cores, fontes, largura e espaçamentos gerais |
| `01-ambient.css` | Fundo, auroras, partículas, cursor e progresso |
| `02-header.css` | Cabeçalho, marca, menu e botões básicos |
| `03-hero.css` | Tela inicial, radar e estatísticas |
| `04-shared.css` | Faixa animada e títulos compartilhados |
| `05-about.css` | Sobre, manifesto e valores |
| `06-proposals.css` | Cards de propostas |
| `07-voice.css` | Comentários e formulário |
| `08-events.css` | Calendário e agenda |
| `09-arena.css` | Esportes, premiação e jogos |
| `10-media.css` | Filtros, cards e artes da mídia |
| `11-participation.css` | Ranking e painel de participação |
| `12-school-teams.css` | Times da escola |
| `13-members.css` | Integrantes da chapa |
| `14-final-footer-modal.css` | Chamada final, rodapé e modal |
| `15-animations.css` | Todas as animações |
| `16-responsive.css` | Tablet, celular, toque e movimento reduzido |

Para mudar apenas conteúdo, comece por `app/site-data.ts`. Para mudar cores,
largura ou espaçamento geral, comece por `app/styles/00-base.css`.
