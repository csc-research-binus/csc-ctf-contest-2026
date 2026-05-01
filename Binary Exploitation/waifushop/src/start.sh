#!/bin/bash
docker-compose down
docker-compose up --build -d --force-recreate
