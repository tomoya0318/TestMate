build:
	@docker compose build

up:
	@docker compose up
	
down:
	@docker compose down

exec:
	@docker exec -it testmate sh

format:
	@docker exec -it testmate yarn format

migrate:
	@docker exec -it testmate yarn migrate

db-reset:
	@docker exec -it testmate yarn db:reset