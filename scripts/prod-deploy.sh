#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f ".env.production" ]]; then
  echo "Missing .env.production. Create it from .env.production.example first."
  exit 1
fi

echo "Starting production stack..."
docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d --remove-orphans

echo "Applying database schema..."
./scripts/prod-migrate.sh

echo "Applying demo seed..."
./scripts/prod-seed.sh

echo "Checking backend health..."
docker compose -f docker-compose.prod.yml --env-file .env.production exec -T backend \
  wget -qO- http://localhost:4000/api/health >/dev/null

echo "Production deploy completed successfully."
