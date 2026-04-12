#!/bin/bash

CATEGORY=$1
NAME=$2

VALID_CATEGORIES=("web" "pwn" "crypto" "forensics" "rev" "osint" "misc")

# Validasi input
if [ -z "$CATEGORY" ] || [ -z "$NAME" ]; then
  echo "Usage: ./scripts/new-challenge.sh <category> <name>"
  echo "Categories: web pwn crypto forensics rev osint misc"
  exit 1
fi

# Validasi kategori
VALID=false
for CAT in "${VALID_CATEGORIES[@]}"; do
  if [ "$CAT" == "$CATEGORY" ]; then
    VALID=true
    break
  fi
done

if [ "$VALID" == false ]; then
  echo "❌ Invalid category: $CATEGORY"
  echo "Valid categories: ${VALID_CATEGORIES[*]}"
  exit 1
fi

DIR="$CATEGORY/$NAME"

# Cegah overwrite
if [ -d "$DIR" ]; then
  echo "❌ Challenge '$DIR' sudah ada!"
  exit 1
fi

# Buat folder structure
mkdir -p "$DIR"/{src,dist,solution}

# Web dan Pwn dapat folder docker
if [ "$CATEGORY" == "web" ] || [ "$CATEGORY" == "pwn" ]; then
  mkdir -p "$DIR/docker"

  cat > "$DIR/docker/Dockerfile" << EOF
FROM ubuntu:22.04

WORKDIR /app
COPY ../src/ .

# TODO: setup environment
EXPOSE 8080

CMD ["bash"]
EOF

  cat > "$DIR/docker/docker-compose.yml" << EOF
services:
  $NAME:
    build: .
    ports:
      - "8080:8080"
    restart: unless-stopped
EOF
fi

# Buat challenge.yml
cat > "$DIR/challenge.yml" << EOF
name: "$NAME"
author: ""
category: $CATEGORY
description: |
  TODO: tulis deskripsi challenge di sini.
value: 500
type: standard
flags:
  - flag: "PETIR{TODO_isi_flag}"
    type: static
tags:
  - $CATEGORY
files: []
hints:
  - content: "TODO: hint pertama"
    cost: 50
EOF

# Buat README.md untuk probsetter
cat > "$DIR/README.md" << EOF
# $NAME [$CATEGORY]

## Deskripsi
TODO

## Solusi Singkat
TODO

## Setup
TODO

## Flag
\`PETIR{TODO}\`
EOF

# Buat solve.py kosong
cat > "$DIR/solution/solve.py" << EOF
#!/usr/bin/env python3
# Solve script for $NAME

TARGET = "http://localhost:8080"

def solve():
    pass  # TODO

if __name__ == "__main__":
    solve()
EOF

# Buat writeup.md kosong
cat > "$DIR/solution/writeup.md" << EOF
# Writeup: $NAME

## Kategori
$CATEGORY

## Deskripsi
TODO

## Langkah Solusi
1. TODO

## Flag
\`PETIR{TODO}\`
EOF

echo "✅ Challenge '$NAME' berhasil dibuat di $DIR"
echo ""
echo "📁 Struktur:"
find "$DIR" -type f | sort
