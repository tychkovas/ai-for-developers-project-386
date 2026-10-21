# AGENTS.md

Сервис бронирования звонков (упрощённый Cal.com). SPA на TypeScript + Vite + React, UI — Mantine v9.

## Команды

- `npm install` — зависимости; пакетный менеджер — npm, lock закоммичен (в CI — `npm ci`).
- `npm run dev` — dev-сервер http://localhost:5173.
- `npm run lint` — **oxlint**, не eslint (create-vite v9).
- `npm run build` — `tsc -b` + продакшен-сборка. Отдельного typecheck нет.
- `npm run preview` — локальный просмотр `dist/`.
- `npm run test` — vitest + дымовой `scripts/smoke.mjs` (`vite preview` на :4173 → HTTP 200). Нужен свежий `dist/` → перед тестом `npm run build`.

Порядок перед коммитом: `lint` → `build` → `test`.

- Node: локально 26, в CI — 22; Vite 8 требует Node 20.19+ / 22.12+.
- Vitest берёт `vite.config.ts`; env по умолчанию `node` — для React-компонентов нужен `jsdom`.

## Коммиты и язык

- Conventional Commits, сообщения на английском.
- README и тексты UI — русский.

## Архитектура (Mantine)

Сначала готовые компоненты и хуки Mantine — без кастомных стилей и велосипедов, если решение есть в библиотеке. Пакеты: `@mantine/core`, `@mantine/hooks`, `@mantine/dates`, `@mantine/form`.

- Стили один раз в `src/main.tsx`: `@mantine/core/styles.css` + `styles.css` каждого используемого пакета (у hooks/form стилей нет).
- `MantineProvider` — в `src/App.tsx`. Не дублировать.
- `postcss.config.cjs` (postcss-preset-mantine) обязателен; расширение `.cjs`, т.к. в `package.json` `"type": "module"`.
- CSS-переменные и типографика — из темы Mantine, не копировать в кастомный CSS.

## Точки входа и конфиг

- `index.html` в корне — вход Vite, не перемещать в `public/`.
- `tsconfig.json` — зонтик (solution style): код в `tsconfig.app.json` (`src/`), `vite.config.ts` — в `tsconfig.node.json`. Опции кода в зонтик не добавлять.
- `dist/` генерируется, не коммитить.

## Критично

- `.github/workflows/hexlet-check.yml` — тесты Хекслета на каждый пуш. **Не удалять и не переименовывать** ни файл, ни репозиторий.
- `.github/workflows/ci.yml` — наш CI: `npm ci` → lint → build (push в main и PR).
