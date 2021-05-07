#! /usr/bin/env bash

short_hash=`git rev-log --short HEAD`
docker-compose build --build-args githash=$short_hash
