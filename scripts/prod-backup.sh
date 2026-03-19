#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f ".env.production" ]]; then
  echo "Missing .env.production. Create it from .env.production.example first."
  exit 1
fi

mkdir -p backups
timestamp="$(date -u +'%Y%m%d-%H%M%S')"
backup_path="backups/foodclick-${timestamp}.sql"

docker compose -f docker-compose.prod.yml --env-file .env.production exec -T db \
  sh -lc 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-privileges' > "${backup_path}"

gzip -f "${backup_path}"
echo "Backup created: ${backup_path}.gz"
