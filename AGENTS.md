# AGENTS.md

Сервис бронирования звонков (упрощённый Cal.com). SPA на TypeScript + Vite + React.

## Стек

- UI — строго Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/dates`, `@mantine/form`). Использовать готовые компоненты и хуки; кастомные стили — только если решения нет в библиотеке.
- Стили подключаются один раз в `src/main.tsx` (`@mantine/core/styles.css` + `styles.css` используемых пакетов). `MantineProvider` — в `src/App.tsx`, не дублировать.
- `postcss.config.cjs` (postcss-preset-mantine) обязателен; расширение `.cjs`, т.к. в `package.json` `"type": "module"`.

## Команды

- `npm run dev` — dev-сервер http://localhost:5173.
- `npm run lint` — **oxlint**, не eslint.
- `npm run build` — `tsc -b` + сборка; отдельного typecheck нет.
- `npm test` — vitest + дымовой тест (`vite preview` на :4173). Нужен свежий `dist/` → перед тестом `npm run build`.

Порядок перед коммитом: `lint` → `build` → `test`.

- Vitest берёт `vite.config.ts`; env по умолчанию `node` — для React-компонентов нужен `jsdom`.

## Коммиты

- Строго Conventional Commits (`feat:`, `fix:`, `chore:` …), сообщения на английском. README и тексты UI — русский.

## CI/CD

- Код перед коммитом должен запускаться локально и не ломать проверки Хекслета: `.github/workflows/hexlet-check.yml`. **Не удалять и не переименовывать** ни файл, ни репозиторий.
- `.github/workflows/ci.yml` — `npm ci` → lint → build (push в main и PR).
