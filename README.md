# Food Delivery Marketplace

Проект разнесён на две отдельные части:

- [`frontend`](/Users/mikhail/Documents/New project/frontend) — `React + Vite`
- [`backend`](/Users/mikhail/Documents/New project/backend) — `Express + TypeScript + PostgreSQL`

Всё приложение поднимается из корня одной docker-командой или через npm-скрипты.

## Структура

- [`frontend/src`](/Users/mikhail/Documents/New project/frontend/src) — исходники клиентского приложения
- [`frontend/Dockerfile`](/Users/mikhail/Documents/New project/frontend/Dockerfile) — сборка фронтенда и запуск через `nginx`
- [`backend/src`](/Users/mikhail/Documents/New project/backend/src) — исходники API
- [`backend/db/schema.sql`](/Users/mikhail/Documents/New project/backend/db/schema.sql) — схема PostgreSQL
- [`backend/db/seed.sql`](/Users/mikhail/Documents/New project/backend/db/seed.sql) — демо-данные
- [`backend/Dockerfile`](/Users/mikhail/Documents/New project/backend/Dockerfile) — контейнер API
- [`docker-compose.dev.yml`](/Users/mikhail/Documents/New project/docker-compose.dev.yml) — dev-стек с hot reload и seed
- [`docker-compose.prod.yml`](/Users/mikhail/Documents/New project/docker-compose.prod.yml) — production-стек для VPS
- [`scripts`](/Users/mikhail/Documents/New project/scripts) — обслуживающие скрипты (`migrate`, `seed`, `backup`)

## Dev-режим одной командой

Для разработки есть отдельный docker-стек с hot reload:

```bash
npm run dev
```

Или в фоне:

```bash
npm run dev:detached
```

После старта доступны:

- frontend: `http://localhost:5173`
- backend API: `http://localhost:4000`
- PostgreSQL: `localhost:55432`

Управление:

```bash
npm run stop:dev
npm run logs:dev
```

## Local Production Like
Для локальной production-проверки (без hot reload):

```bash
npm run start:detached
```

После старта доступны:

- frontend: `http://localhost:3000`
- backend API: `http://localhost:4000`
- PostgreSQL: `localhost:55432`

Остановка и логи:

```bash
npm run stop
npm run logs
```

## VPS Deployment (Production)

### 1. Подготовка переменных

Создай `.env.production` на сервере из шаблона:

```bash
cp .env.production.example .env.production
```

Заполни минимум:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `FRONTEND_PORT` (обычно `80`)

### 2. Запуск production-стека

```bash
npm run prod:up
```

### 3. Деплой одной командой (с обязательным seed)

```bash
npm run prod:deploy
```

Команда выполняет:

- `prod up`
- `prod migrate`
- `prod seed` (всегда)
- healthcheck backend

### 4. Применение схемы после изменений БД

Если схема изменилась (новые таблицы/индексы), применяй:

```bash
npm run prod:migrate
```

Это важно для persistent volume PostgreSQL: init-скрипты не выполняются повторно автоматически.

### 5. Демо-наполнение (только если нужно)

```bash
npm run prod:seed
```

`prod:seed` перезаписывает демо-данные (`TRUNCATE + INSERT`) и не подходит для реальных пользовательских данных.

### 6. Бэкап БД

```bash
npm run prod:backup
```

Бэкап будет сохранён в `backups/*.sql.gz`.

### 7. Управление production-стеком

```bash
npm run prod:logs
npm run prod:down
```

## API endpoints

- `GET /api/health`
- `GET /api/store-categories`
- `GET /api/stores?category_slug=produkty&search=маркет`
- `GET /api/stores/:slug`
- `GET /api/stores/:slug/products?type=dish&search=ролл`
- `GET /api/products/:id`

## Локальная разработка вне Docker

- frontend env: [`frontend/.env.example`](/Users/mikhail/Documents/New project/frontend/.env.example)
- backend env: [`backend/.env.example`](/Users/mikhail/Documents/New project/backend/.env.example)

Для локального запуска вне Docker зависимости теперь должны ставиться отдельно внутри `frontend` и `backend`.
