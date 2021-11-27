create-network:
	docker network create tabu_network || true

build:
	cd server; docker-compose build;

initdb:
	docker volume create mongodb

init:
	create-network build

dev:
	cd server; docker-compose up -d;

full:
	init dev
