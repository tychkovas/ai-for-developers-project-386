# AGENTS.md

SPA для бронирования звонков (упрощённый Cal.com): TypeScript + Vite + React, UI — Mantine.

## Команды — только make

- Все операции через Makefile: `make install` / `make dev` / `make build` / `make lint` / `make test`. Не вызывай npm-скрипты напрямую.
- `make test` сам запускает сборку: smoke-тест поднимает `vite preview` из `dist/`, без свежей сборки он падает.
- Линтер — **oxlint** (`.oxlintrc.json`), не eslint.

## Архитектура

- UI — строго Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/dates`, `@mantine/form`). Используй готовые компоненты и хуки. Не пиши кастомные стили и не создавай собственные реализации компонентов/хуков, если готовое решение есть в библиотеке.
- Стили Mantine подключаются один раз в `src/main.tsx`; `MantineProvider` — один раз в `src/App.tsx`. Не дублируй.
- `postcss.config.cjs` обязателен (postcss-preset-mantine); расширение `.cjs` — из-за `"type": "module"` в package.json.

## Тесты

- Юнит-тестов пока нет (`vitest run --passWithNoTests`). Для тестов React-компонентов нужен jsdom: vitest читает `vite.config.ts`, env по умолчанию node.

## CI

- `.github/workflows/ci.yml`: lint → build → test на каждый push/PR.
- Не удаляй и не переименовывай `.github/workflows/hexlet-check.yml` и репозиторий — от них зависят проверки Хекслета.
- Релизы автоматизированы release-please: тип commit-сообщения (`feat`/`fix`) определяет версию релиза.

## Коммиты

- Строго Conventional Commits (`feat:`, `fix:`, `chore:` …), сообщения на английском. README и тексты UI — на русском.
