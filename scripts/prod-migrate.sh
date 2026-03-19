#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f ".env.production" ]]; then
  echo "Missing .env.production. Create it from .env.production.example first."
  exit 1
fi

docker compose -f docker-compose.prod.yml --env-file .env.production exec -T db \
  sh -lc 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < ./backend/db/schema.sql

echo "Production schema applied."
