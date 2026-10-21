# AGENTS.md

Сервис бронирования звонков (упрощённый Cal.com). SPA на TypeScript + Vite + React.

## Стек

- UI — строго Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/dates`, `@mantine/form`). Использовать готовые компоненты и хуки; кастомные стили — только если решения нет в библиотеке.
- Стили подключаются один раз в `src/main.tsx` (`@mantine/core/styles.css` + `styles.css` используемых пакетов). `MantineProvider` — в `src/App.tsx`, не дублировать.
- `postcss.config.cjs` (postcss-preset-mantine) обязателен; расширение `.cjs`, т.к. в `package.json` `"type": "module"`.

## Скилы

- Скилы лежат в `.agents/skills/<имя>/SKILL.md`; основной набор — `mattpocock/skills` (38), дополнительно `find-skills` из `vercel-labs/skills`. Источники и версии — `skills-lock.json` (управление через `npx skills add|update|remove|list`).
- OpenCode V2 обнаруживает `.agents/skills/` автоматически (project-совместимый источник скилов) — `opencode.json` для этого не нужен.
- Осторожно с `npx skills remove`: удаляет копии во всех местах сразу (`remove -g` убрал и глобальную `~/.agents/skills/`, и проектную). После remove/add сверять `npx skills list` с `skills-lock.json`.
- `skills-lock.json` трекается git (lockfile скилов, аналог `package-lock.json`); `.agents/` — генерируемое из lock содержимое, в git не попадает (в `.gitignore`). Восстановление на свежем клоне: `npx skills experimental_install`.
- Подходящий под задачу скил искать в `.agents/skills/` (`tdd`, `code-review`, `pr`, `diagnosing-bugs`, `research`, …); перед применением читать его `SKILL.md` целиком.
- Часть скилов помечена `disable-model-invocation: true` — они не рекламируются модели, но остаются зарегистрированными: загружаются явно через `skill` tool по ID (пользователь — через `@skill-id`). Скилы — не команды: в меню `/` их нет.

## Agent skills

### Issue tracker

Задачи — в GitHub Issues репозитория (через `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Дефолтные метки: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` и `docs/adr/` в корне репо. See `docs/agents/domain.md`.

## Команды

- `npm run dev` — dev-сервер http://localhost:5173.
- `npm run lint` — **oxlint**, не eslint.
- `npm run build` — `tsc -b` + сборка; отдельного typecheck нет.
- `npm test` — `vitest run --passWithNoTests` + дымовой тест `scripts/smoke.mjs` (`vite preview` на :4173). Юнит-тестов пока нет. Нужен свежий `dist/` → перед тестом `npm run build`.

Порядок перед коммитом: `lint` → `build` → `test`.

- Vitest берёт `vite.config.ts`; env по умолчанию `node` — для React-компонентов нужен `jsdom`.

## Коммиты

- Строго Conventional Commits (`feat:`, `fix:`, `chore:` …), сообщения на английском. README и тексты UI — русский.

## CI/CD

- Код перед коммитом должен запускаться локально и не ломать проверки Хекслета: `.github/workflows/hexlet-check.yml`. **Не удалять и не переименовывать** ни файл, ни репозиторий.
- `.github/workflows/ci.yml` — `npm ci` → lint → build → test (push в main и PR).
- Релизы автоматизированы release-please (`.github/workflows/release-please.yml`) по Conventional Commits в main — тип commit-сообщения влияет на версию релиза.
