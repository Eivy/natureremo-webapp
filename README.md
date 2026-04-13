# NatureRemo WebApp

![](https://github.com/Eivy/natureremo-webapp/actions/workflows/deploy.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Eivy/natureremo-webapp/badge.svg?branch=master)](https://coveralls.io/github/Eivy/natureremo-webapp?branch=master)

WebApp for [Nature Remo](https://nature.global/en/nature-remo)

Works at https://eivy.github.io/natureremo-webapp

## Tech Stack

- [SolidJS](https://www.solidjs.com/) — UI framework
- [@solidjs/router](https://github.com/solidjs/solid-router) — Routing
- [Vite](https://vitejs.dev/) — Build tool
- [Vitest](https://vitest.dev/) + [@solidjs/testing-library](https://github.com/solidjs/solid-testing-library) — Testing
- [i18next](https://www.i18next.com/) — Internationalization

## Develop

### Prerequisites

- Node.js 18+

### Setup

```sh
npm install
```

### Available Scripts

#### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload automatically on edits.

#### `npm test`

Runs the test suite once.

#### `npm run test:watch`

Runs the test suite in interactive watch mode.

#### `npm run build`

Builds the app for production to the `dist` folder.

#### `npm run preview`

Serves the production build locally for preview.

#### `npm run lint`

Runs ESLint on the `src` directory.
