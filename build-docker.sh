#! /usr/bin/env bash

short_hash=$(git rev-parse --short HEAD)
docker-compose build --build-arg githash=$short_hash
