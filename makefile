

start: #start docker container
	@sudo docker-compose up -d && npm run dev

stop: #Stop DB
	@sudo docker-compose down

show: #Show containers
	@sudo docker ps

connect_db: #Stop DB
	@sudo docker-compose exec db bash

delete_all: #docker stop $(docker ps -aq)
	@sudo docker container prune && sudo docker image prune -a && sudo docker volume prune

create_seeder: # create seeder
	@npx sequelize seed:generate --name $(name)

refresh: #refresh DB and reSeeding
	@npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all