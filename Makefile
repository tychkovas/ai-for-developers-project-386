.PHONY: help install dev build lint test openapi sdk server

help: ## Показать список целей
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm install

dev: ## Запустить dev-сервер (http://localhost:5173)
	npm run dev

build: ## Собрать проект (tsc + vite build)
	npm run build

lint: ## Запустить линтер (oxlint)
	npm run lint

openapi: ## Сгенерировать OpenAPI из TypeSpec-контракта (spec/ -> docs/openapi.yaml)
	cd spec && npx tsp compile .

sdk: ## Сгенерировать клиентский SDK (docs/openapi.yaml -> src/api/)
	npx openapi-ts

server: ## Сгенерировать серверные артефакты (docs/openapi.yaml -> server/, нужен Java 11+)
	npx openapi-generator-cli generate -i docs/openapi.yaml -g typescript-nestjs -o server \
		--additional-properties=npmName=call-scheduling-server,npmVersion=0.0.0,supportsES6=true

test: build ## Запустить тесты (нужен свежий dist/, поэтому сначала build)
	npm test
