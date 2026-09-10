# Serenitas Premium — VS Code e Vercel

Esta é a versão mais recente da landing page, com fotografia cinematográfica, mockups conceituais do aplicativo, tipografia local, animações, navegação responsiva, comparação de planos e demonstração interativa.

## Abrir no VS Code

1. Extraia o ZIP.
2. No VS Code, use Arquivo > Abrir Pasta e escolha serenitas-premium (a pasta que contém vercel.json e dist).
3. Os arquivos HTML, CSS e JavaScript são editáveis diretamente. Não há etapa de compilação nem dependências da landing page para instalar.

## Visualizar no computador

Com Python instalado no Windows, execute no terminal dessa pasta:

```powershell
py -m http.server 5500 --directory dist
```

Abra http://localhost:5500 no navegador. Para parar, pressione Ctrl+C.
Em macOS/Linux, use python3 em lugar de py.
Também é possível usar sua extensão de servidor local do VS Code apontada para dist/index.html.

## Publicar na Vercel pelo terminal

Com Node.js/npm instalado e uma conta Vercel:

```powershell
npx vercel login
npx vercel --prod
```

Aceite instalar a CLI quando o npm perguntar. Escolha sua conta/equipe. Para um novo projeto, responda que não deseja vincular a projeto existente, dê um nome e mantenha a pasta atual como diretório do projeto.

O arquivo vercel.json já configura:
- Framework: Other
- Build Command: vazio (sem build)
- Install Command: vazio (sem dependências)
- Output Directory: dist

A CLI retornará a URL após a publicação. A visibilidade depende das configurações de Deployment Protection do seu projeto na Vercel; revise-as antes de divulgar a URL.

## Alternativa: GitHub + Vercel

Crie um repositório com o conteúdo da pasta serenitas-premium, incluindo vercel.json e dist. Na Vercel importe esse repositório como projeto. Mantenha Root Directory na raiz, Framework Other, Build Command vazio e Output Directory dist. Publique. Alterações futuras no Git conectado podem iniciar novas publicações.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| dist/index.html | Textos, seções, planos e perguntas frequentes |
| dist/styles.css | Cores, fontes, layout, responsividade e animações |
| dist/app.js | Demonstração, planos mensal/anual, menu e efeitos de rolagem |
| dist/assets | Imagens e fontes locais |
| vercel.json | Configuração de publicação |

## Estado do produto

Este pacote contém a landing page, não o backend nem o aplicativo completo. As telas são mockups conceituais baseados na documentação recuperada do projeto; não são capturas do aplicativo em produção. Os preços e limites continuam como proposta para validação. Contratação, formulários comerciais e pagamento ainda não estão conectados.

As fontes DM Sans e Cormorant Garamond incluem suas licenças em dist/assets/fonts. Imagens e fontes estão locais; a página não depende do link privado anterior para funcionar.

## Documentação consultada

- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/cli/deploy
