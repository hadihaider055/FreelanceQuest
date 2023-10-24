DOCKER_BUILD_IMAGE_NAME_FRONTEND = fp/frontend
DOCKER_BUILD_IMAGE_NAME_BACKEND = fp/backend

build: build-backend build-frontend

build-backend:
	docker build \
		-t $(DOCKER_BUILD_IMAGE_NAME_BACKEND) \
		backend

build-frontend:
	docker build \
	-t $(DOCKER_BUILD_IMAGE_NAME_FRONTEND) \
	frontend

run:
	docker compose up --remove-orphans
