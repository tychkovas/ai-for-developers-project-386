# Research: hey-api CLI и конфигурация генерации SDK

Тикет: research #18. Дата исследования: 2026-10-21. Все факты — из первоисточников (heyapi.dev, npm registry), вторичные блоги не использовались.

## 1. npm-пакет CLI и команда запуска

- Пакет: **`@hey-api/openapi-ts`**. Из docs/get-started: «`@hey-api/openapi-ts` generates TypeScript code from OpenAPI specifications. Point it at your spec, pick your plugins, and get production-grade code in seconds.»
- Бинарник в пакете называется **`openapi-ts`** (из метаданных npm registry: `"bin": { "openapi-ts": "./bin/run.js" }`). Отдельного бинарника `hey-api` у этого пакета нет.
- Быстрый старт через npx (цитата из get-started):

  ```sh
  npx @hey-api/openapi-ts -i hey-api/backend -o src/client
  ```

- Рекомендуемый способ — локальная установка и script в `package.json` (цитата: «Most people run `@hey-api/openapi-ts` via CLI. To do that, add a script to your `package.json` file which will make `openapi-ts` executable through script.»):

  ```sh
  npm install @hey-api/openapi-ts -D -E
  ```

  ```json
  "scripts": {
    "openapi-ts": "openapi-ts"
  }
  ```

  Запуск: `npm run openapi-ts` (или эквивалент в других пакетных менеджерах).
- Существует и программный API (цитата: «You can also generate output programmatically by calling `createClient()`»):

  ```ts
  import { createClient } from '@hey-api/openapi-ts';

  createClient({
    input: 'hey-api/backend',
    output: 'src/client',
  });
  ```

- Есть также опция интеграции в сборку через `@hey-api/vite-plugin` (см. п. 4) — в нашем проекте не используется, выбран CLI.

## 2. Формат конфигурации

- Имя файла: **`openapi-ts.config.ts`** — основной вариант. Docs: конфиг загружается «from any file inside your project root folder supported by jiti loader», поддерживаются также `openapi-ts.config.cjs`, `openapi-ts.config.mjs`, `openapi-ts.config.js`.
- Тип/схема: экспорт объекта через хелпер `defineConfig` из самого пакета; полный список опций — интерфейс **`UserConfig`** в `packages/openapi-ts/src/config/types.ts` репозитория hey-api (docs: «You can view the complete list of options in the `UserConfig` interface.»). Для CJS/ESM — JSDoc-тип `import('@hey-api/openapi-ts').UserConfig`.
- Базовая структура (цитата из docs/configuration):

  ```ts
  import { defineConfig } from '@hey-api/openapi-ts';

  export default defineConfig({
    input: 'hey-api/backend',
    output: 'src/client',
  });
  ```

- **`input`** (обязателен): «The input can be a string path, URL, API registry shorthand, an object containing any of these, or an object representing an OpenAPI specification. Hey API supports all valid OpenAPI versions and file formats.» То есть локальный путь (`input: './path/to/openapi.json'`) и URL (`input: 'https://...'`) поддерживаются. Для YAML-спеки в репозитории — путь вида `input: './docs/openapi.yaml'`. Для HTTPS URL с самоподписанным сертификатом в dev нужен `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- **`output`** (обязателен): «You must set the output so we know where to generate your files. It can be a path to the destination folder or an object containing the destination folder path and optional settings.» Пример: `output: 'src/client'` или `output: { path: 'src/client', ... }`. Docs предупреждают: «You should treat the output folder as a dependency. Do not directly modify its contents».
- **Выбор клиента**: в актуальной документации клиент выбирается **не** опцией `client: 'fetch'`, а **плагином**. Страница clients: «Hey API natively supports the following clients» (Fetch API, Angular, Axios, Ky, Next.js, Nuxt, OFetch и др.), раздел называется «Plugins». Для Fetch (цитата со страницы fetch-клиента):

  ```ts
  export default {
    input: 'hey-api/backend',
    output: 'src/client',
    plugins: ['@hey-api/client-fetch'],
  };
  ```

  либо флагом CLI:

  ```sh
  npx @hey-api/openapi-ts -i hey-api/backend -o src/client -c @hey-api/client-fetch
  ```

  Важно: «This step is optional because **Fetch is the default client**.» — Fetch уже используется по умолчанию. **Не подтверждается**: опция `client: 'fetch'` в верхнем уровне конфига в текущей документации не показана; если она существовала в старых версиях, в первоисточниках 2026 года она не описана (может быть удалена; миграции публикуются на странице migrating).
- По умолчанию генерируются TypeScript-интерфейсы и SDK (docs: «By default, Hey API will generate TypeScript interfaces and SDK from your OpenAPI specification.»), т.е. примерно: `types.gen.ts`, `sdk.gen.ts`, `client.gen.ts`, `index.ts`.
- Возможен один конфиг на несколько задач (массив конфигов / `input: [...], output: [...]` — «Multiple jobs», «Job matrix»).

## 3. Требования к Node и версионирование

- **Node 22+ подтверждён.** Из docs/get-started (Features): «runs in any Node.js 22+ environment». Точнее — из `engines` в npm registry для версии 0.99.0: `"engines": { "node": ">=22.18.0" }`. Наш Node v26.7.0 удовлетворяет требованию.
- **Пин версии — рекомендуется.** Цитата из get-started, раздел Versioning: «This package is in initial development. Please pin an exact version so you can safely upgrade when you're ready. We publish migration notes for every breaking release.» Отсюда установка с флагом `-E` (exact): `npm install @hey-api/openapi-ts -D -E`.
- **Текущая latest версия на npm: `0.99.0`** (по данным `https://registry.npmjs.org/@hey-api/openapi-ts/latest`, получено 2026-10-21). Пакет в статусе 0.x, т.е. semver для 0.x — каждый минорный релиз может содержать breaking changes; миграции: https://heyapi.dev/docs/openapi/typescript/migrating.
- Peer-зависимость: `typescript >=5.5.3 || >=6.0.0 || 6.0.1-rc`.

## 4. `@hey-api/vite-plugin` и Vite 8 (справочно)

**Конфликт с Vite 8.3.4 не подтверждается — docs явно заявляют поддержку Vite 8.**

- Страница vite (description): «Integrate `@hey-api/openapi-ts` into your Vite 5, 6, 7, or 8 build pipeline with the official Vite plugin.»
- Раздел Features: «supports Vite 5, 6, 7, and 8».
- С get-started: «If you're using Vite 5, 6, 7, or 8, you can integrate `@hey-api/openapi-ts` directly into your build pipeline with `@hey-api/vite-plugin`.»
- Плагин запускает генерацию автоматически: «runs automatically as part of your Vite build» / «whenever Vite resolves its configuration – no separate script or manual step required», читает существующий конфиг или принимает инлайн-опции (`heyApiPlugin({ config: { input, output } })`), есть опция `vite` (например `apply: 'serve'`).
- В нашем проекте плагин не используется (решение: CLI через `openapi-ts` script) — это согласуется с документацией, оба варианта официальны. Ограничение `peerDependencies` самого `@hey-api/vite-plugin` в рамках данного исследования не проверялось (страница пакета на npmjs.com недоступна, 403); заявленная совместимость — только со слов docs heyapi.dev.

## Использованные URL-первоисточники

1. https://heyapi.dev/docs/openapi/typescript/get-started
2. https://heyapi.dev/docs/openapi/typescript/configuration
3. https://heyapi.dev/docs/openapi/typescript/clients
4. https://heyapi.dev/docs/openapi/typescript/clients/fetch
5. https://heyapi.dev/docs/openapi/typescript/configuration/vite
6. https://registry.npmjs.org/@hey-api/openapi-ts/latest (метаданные latest-версии: version, engines, bin — первоисточник npm registry; www.npmjs.com/package/... вернул 403)

Дополнительно упомянуты в документации (не открывались в рамках тикета): https://heyapi.dev/docs/openapi/typescript/configuration/input , .../configuration/output , https://heyapi.dev/docs/openapi/typescript/migrating , https://github.com/hey-api/hey-api/blob/main/packages/openapi-ts/src/config/types.ts (`UserConfig`).
