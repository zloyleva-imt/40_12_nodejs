

start: #Start DB
	@sudo docker-compose up -d

stop: #Stop DB
	@sudo docker-compose down

show: #Show containers
	@sudo docker ps

connect_db: #Stop DB
	@sudo docker-compose exec db bash

delete_all: #docker stop $(docker ps -aq)
	@docker container prune && docker image prune -a && docker volume prune