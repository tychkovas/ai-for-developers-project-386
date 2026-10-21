.PHONY: help install dev build lint test

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

test: build ## Запустить тесты (нужен свежий dist/, поэтому сначала build)
	npm test
