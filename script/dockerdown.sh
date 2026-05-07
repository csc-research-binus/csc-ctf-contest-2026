#!/bin/bash

# Mendeteksi lokasi script ini berada, lalu naik satu tingkat ke folder utama proyek
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Mencari file docker-compose.yml dan compose.yaml secara rekursif di: $PROJECT_ROOT"

while IFS= read -r -d '' file; do
    dir=$(dirname "$file")
    
    echo "--------------------------------------------------------"
    echo "Menjalankan 'docker compose down' di direktori:"
    echo "$dir"
    echo "--------------------------------------------------------"
    
    (cd "$dir" && docker compose down)
    
done < <(find "$PROJECT_ROOT" -type f \( -name "docker-compose.yml" -o -name "compose.yaml" \) -print0)

echo "Proses mematikan container selesai."
