# QA Challenge - Playwright e TypeScript

Este repositório contém um conjunto de testes automatizados utilizando **Playwright** e **TypeScript** para testar tanto a interface de usuário (UI) quanto a API.

## Tecnologias Utilizadas
- **Playwright** para testes automatizados de UI e API
- **TypeScript** para tipagem estática
- **Node.js** como ambiente de execução

## Clonando o Repositório
Para obter uma cópia local do projeto, execute o seguinte comando:

```sh
git clone https://github.com/rodrigosalles7/qa-challenge-rodrigo.git
cd qa-challenge-rodrigo
```

## Instalando Dependências
Antes de rodar os testes, é necessário instalar as dependências do projeto:

```sh
npm install
```

## Verificando as Versões das Dependências
Para garantir que todas as dependências estão instaladas corretamente, você pode verificar as versões:

```sh
node -v         # Versão do Node.js
npx playwright --version  # Versão do Playwright
ts-node -v      # Versão do TypeScript
```

## Executando os Testes
O projeto possui diferentes scripts para executar os testes de forma segmentada:

### Testes de Interface (UI)
Executa apenas os testes da interface de usuário:
```sh
npm run test:ui
```

### Testes de API
Executa apenas os testes de API:
```sh
npm run test:api
```

### Testes em Paralelo
Executa todos os testes (UI e API) simultaneamente:
```sh
npm run test:parallel
```

## Configuração do Playwright
O repositório já está configurado para executar os testes nos principais navegadores. A configuração pode ser encontrada no arquivo `playwright.config.ts`.

### Executando Testes no GitHub Actions
Os testes são executados automaticamente no GitHub Actions sempre que houver um **push** ou **pull request** para os branches `main` ou `master`. O fluxo de execução está definido no arquivo `playwright.yml`.

## Relatório de Testes
Após a execução dos testes, um relatório em HTML é gerado. Para visualizar o relatório localmente, use:

```sh
npx playwright show-report
```

---

**Rodrigo Salles** - QA Engineer

