#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

docker compose up -d --build challenge player
docker compose ps

printf '\nChallenge is listening on 127.0.0.1:5000\n'
printf 'Player environment is ready in the "player" service.\n'
printf 'Open it with: docker compose exec player bash\n'
