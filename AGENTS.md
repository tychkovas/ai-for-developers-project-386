# AGENTS.md

Сервис бронирования звонков (упрощённый Cal.com). SPA на TypeScript + Vite + React, UI — Mantine v9.

## Команды

```bash
npm run dev        # dev-сервер на http://localhost:5173
npm run lint       # oxlint (НЕ eslint — линтер из шаблона create-vite v9)
npm run build      # проверка типов (tsc -b) + продакшен-сборка
npm run preview    # локальный просмотр собранного dist/
```

- Отдельного скрипта typecheck нет: типы проверяются внутри `npm run build`.
- Используется npm, lock-файл закоммичен → в CI работает `npm ci`.
- Node: локально 26, в CI (`ci.yml`) — 22. Vite 8 требует Node 20.19+ / 22.12+.

## Перед каждым коммитом

1. `npm run lint`
2. `npm run build`
3. Убедиться, что `npm run dev` поднимается без ошибок
4. Коммит строго по Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:` и т.д.

## Критичные правила

- `.github/workflows/hexlet-check.yml` — тесты Хекслета, запускаются на каждый пуш во все ветки. **Не удалять и не переименовывать** ни файл, ни репозиторий.
- `.github/workflows/ci.yml` — наш CI: `npm ci` → lint → build (push в main и PR).
- Язык README и текстов UI — русский. Коммит-сообщения — английские, conventional.

## Специфика Mantine

- **Сначала искать готовое в Mantine** (120+ компонентов, хуки, `@mantine/form`): не писать кастомные стили и компоненты, если решение есть в библиотеке.
- Стили подключаются один раз в `src/main.tsx`: `@mantine/core/styles.css` (обязателен) + styles.css каждого используемого пакета (у `@mantine/hooks` и `@mantine/form` стилей нет).
- `MantineProvider` — в `src/App.tsx`.
- Установлены пакеты: `@mantine/core`, `@mantine/hooks`, `@mantine/dates` (календари для бронирования), `@mantine/form`.
- `postcss.config.cjs` (postcss-preset-mantine) обязателен. Расширение именно `.cjs`: в `package.json` стоит `"type": "module"`.
- CSS-переменные Mantine и типографика описаны в теме; не дублировать в кастомном CSS.

## Точки входа

- `index.html` в корне — входная точка Vite (не перемещать в public/): от `<script src="/src/main.tsx">` строится граф модулей.
- `tsconfig.json` — «зонтик» (solution style): `tsconfig.app.json` для кода в `src/`, `tsconfig.node.json` для `vite.config.ts` (Node-окружение).
- `dist/` — генерируется, не коммитится.
