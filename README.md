# Календарь звонков


[![hexlet-check](https://github.com/tychkovas/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/tychkovas/ai-for-developers-project-386/actions)

SPA для записи на звонки (упрощённый Cal.com), разрабатываемый совместно с ИИ.

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-for-developers
Как это должно работать: https://files.hexlet.app/a/2ipc5m

## Стек

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Mantine](https://mantine.dev/) — UI-библиотека
- [oxlint](https://oxc.rs/docs/guide/usage/linter) — линтер
- [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/) — тесты

## Установка

```bash
git clone https://github.com/tychkovas/ai-for-developers-project-386.git
cd ai-for-developers-project-386
make install
```

## Использование

```bash
# Запустить dev-сервер (http://localhost:5173)
make dev

# Проверить линтером (oxlint)
make lint

# Продакшен-сборка (tsc + vite build)
make build

# Тесты: юнит + smoke (сборка входит)
make test
```

## Артефакты API-контракта

Контракт описан в TypeSpec (`spec/main.tsp`) и генерируется в артефакты:

```bash
# Вся цепочка: spec/ -> docs/openapi.yaml -> src/api (SDK) -> server (стаб NestJS)
make generate

# По отдельности
make openapi   # TypeSpec -> docs/openapi.yaml
make sdk       # docs/openapi.yaml -> src/api/ (клиентский SDK, hey-api)
make server    # docs/openapi.yaml -> server/ (openapi-generator, нужен Java 11+)
```

Сгенерированные `docs/openapi.yaml`, `src/api/` и `server/` закоммичены и свежесть проверяется в CI. `src/api/` и `server/` — артефакты: они не компилируются и не линтуются.

Локальный просмотр продакшен-сборки: `npm run preview`

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
