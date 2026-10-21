# AGENTS.md

Сервис бронирования звонков (упрощённый Cal.com). SPA на TypeScript + Vite + React, UI — Mantine v9.

## Команды

- `npm install` — установка зависимостей (пакетный менеджер — npm, lock-файл закоммичен).
- `npm run dev` — dev-сервер на http://localhost:5173.
- `npm run lint` — линтер **oxlint**, НЕ eslint (шаблон create-vite v9).
- `npm run build` — проверка типов (`tsc -b`) + продакшен-сборка. Отдельного typecheck-скрипта нет.
- `npm run test` — vitest + дымовой тест (`scripts/smoke.mjs`: `vite preview` на :4173 → проверка HTTP 200). Нужен свежий `dist/`, поэтому перед ним — `npm run build`.

Порядок проверки перед коммитом: `lint` → `build` → `test`.

- Node: локально 26, в CI — 22; Vite 8 требует Node 20.19+ / 22.12+.
- `tsconfig.json` — «зонтик» (solution style): опции кода в `tsconfig.app.json` (src/), `tsconfig.node.json` — для `vite.config.ts`. Не добавлять опции в зонтик.
- `index.html` лежит в корне — входная точка Vite, не перемещать в public/.

## Архитектурное правило

Используй готовые компоненты и хуки Mantine. Не пиши кастомные стили и не создавай велосипеды, если в библиотеке есть готовое решение.

- Стили Mantine подключаются один раз в `src/main.tsx`, `MantineProvider` — в `src/App.tsx`. Не дублировать.
- Vitest подхватывает `vite.config.ts` автоматически; окружение по умолчанию `node` — для тестов React-компонентов понадобится `jsdom`.

## Коммиты

- Строго используй спецификацию Conventional Commits; сообщения — на английском.
- Язык README и текстов UI — русский.

## Критично

- `.github/workflows/hexlet-check.yml` — тесты Хекслета, запускаются на каждый пуш. **Не удалять и не переименовывать** ни файл, ни репозиторий.
