# Guia de edição — Chapa Azul

Este guia mostra onde alterar cada parte do site. A organização separa três
tipos de arquivo:

1. **Conteúdo:** textos, datas, nomes e números.
2. **Componentes:** estrutura de cada parte da página.
3. **Estilos:** cores, tamanhos, espaçamentos e adaptação para celular.

## Comece por aqui

Para trocar informações sem alterar o desenho, abra:

- `app/site-data.ts`

Esse arquivo possui blocos identificados em português para:

- menu;
- propostas;
- comentários;
- calendário e eventos;
- esportes e jogos;
- centro de mídia;
- rankings;
- times da escola;
- integrantes da chapa.

Mude apenas os textos e valores que ficam entre aspas ou depois dos nomes dos
campos. Não troque nomes como `title`, `accent`, `image` ou `color`, pois o código
usa esses nomes para montar o site.

## Estrutura visível da página

Cada parte do site possui seu próprio arquivo em `app/components/`:

| Parte no site | Arquivo |
| --- | --- |
| Fundo, partículas e cursor | `AmbientBackground.tsx` |
| Cabeçalho e menu | `SiteHeader.tsx` |
| Primeira tela, logo e Gumball | `HeroSection.tsx` |
| Faixa animada | `HeroSection.tsx` (`MovementMarquee`) |
| Sobre a chapa | `AboutSection.tsx` |
| Propostas | `ProposalsSection.tsx` |
| Voz dos alunos e formulário | `VoiceSection.tsx` |
| Agenda e calendário | `EventsSection.tsx` |
| Arena, esportes e gincanas | `ArenaSection.tsx` |
| Centro de mídia | `MediaSection.tsx` |
| Ranking e participação | `ParticipationSection.tsx` |
| Times da escola | `TeamsSection.tsx` |
| Integrantes da chapa | `TeamSection.tsx` |
| Chamada azul final | `FinalCta.tsx` |
| Rodapé | `SiteFooter.tsx` |
| Janela/modal da mídia | `MediaModal.tsx` |

Use esses arquivos para trocar frases que não estão em `site-data.ts`. Não
altere `className`, `id`, `onClick`, `onSubmit` ou palavras que começam com
`on`, a menos que queira modificar o funcionamento da página.

## Aparência e CSS

Os estilos estão em `app/styles/`:

| O que você quer alterar | Arquivo |
| --- | --- |
| Cores gerais, largura e distância entre seções | `00-base.css` |
| Fundo, auroras, partículas e cursor | `01-ambient.css` |
| Cabeçalho, menu, logotipo e botões | `02-header.css` |
| Primeira tela, título, logo, Gumball e estatísticas | `03-hero.css` |
| Títulos repetidos e faixa animada | `04-shared.css` |
| Sobre, manifesto e valores | `05-about.css` |
| Cards das propostas | `06-proposals.css` |
| Comentários e formulário | `07-voice.css` |
| Calendário e lista de eventos | `08-events.css` |
| Arena, esportes, premiação e jogos | `09-arena.css` |
| Cards, filtros e desenhos da mídia | `10-media.css` |
| Ranking e painel de participação | `11-participation.css` |
| Times da escola | `12-school-teams.css` |
| Integrantes da chapa | `13-members.css` |
| Chamada final, rodapé e modal | `14-final-footer-modal.css` |
| Velocidade e formato das animações | `15-animations.css` |
| Tablet, celular e telas pequenas | `16-responsive.css` |

### Trocar cores gerais

Abra `app/styles/00-base.css`. No começo do arquivo existe o bloco `:root`, com
nomes como:

- `--ink`: texto claro principal;
- `--muted` e `--dim`: textos secundários;
- `--blue`, `--electric`, `--cyan` e `--violet`: tons principais;
- `--mint`: indicadores verdes;
- `--night`: fundo preto;
- `--line`: bordas;
- `--shadow`: sombra dos painéis.

Alguns gradientes possuem cores próprias dentro dos arquivos de cada seção. Se
uma cor não mudar pelo `00-base.css`, procure o código da cor no arquivo da
seção correspondente.

### Alterar menu

- Nomes e destinos: bloco **MENU PRINCIPAL** em `app/site-data.ts`.
- Aparência: `app/styles/02-header.css`.
- Estrutura e botão do celular: `app/components/SiteHeader.tsx`.

O segundo valor de cada item do menu é o identificador da seção. Ele deve
continuar igual ao `id` da seção de destino.

### Alterar rodapé

- Links e textos: `app/components/SiteFooter.tsx`.
- Cores, espaços e posição: seção do rodapé em
  `app/styles/14-final-footer-modal.css`.

### Alterar a versão para celular

Abra `app/styles/16-responsive.css`. Os blocos `@media` indicam a largura:

- `1100px`: notebook/tablet grande;
- `900px`: tablet e menu recolhido;
- `680px`: celular;
- `420px`: celular pequeno.

## Funções interativas

O arquivo `app/site-interactions.ts` mantém:

- cursor personalizado;
- barra de progresso;
- seção ativa do menu;
- animações quando a seção aparece;
- abertura e fechamento do modal;
- tecla `Esc`;
- inclinação 3D dos cartões.

O arquivo `app/page.tsx` conecta essas funções aos componentes. Para mudanças
somente visuais ou de texto, normalmente não é necessário alterar nenhum dos
dois.

## Conferir antes do commit

Para abrir o site durante a edição:

```bash
npm run dev
```

Para verificar tudo antes de commitar:

```bash
npm run lint
npm test
```

Para preparar somente os arquivos desta reorganização, sem adicionar outros
arquivos por acidente:

```bash
git status
git add README.md GUIA-DE-EDICAO.md app tests
git commit --only -m "Organiza conteúdo, componentes e estilos do site" -- README.md GUIA-DE-EDICAO.md app tests
```

O `--only` evita incluir no commit outras mudanças que já estavam preparadas no
Git. Evite `git add .` quando houver alterações na pasta que não façam parte do
site.
