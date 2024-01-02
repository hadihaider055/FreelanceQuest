# Freelancing Platform DBMS Project

This repo is for our database management system (DBMS) course project. The project is designed to help freelancers and clients connect and collaborate efficiently.

## Features

- User registration and authentication.
- Project posting and bidding.
- Payment processing.
- Messaging between users.

## Running the Project with Docker

This project is Dockerized. Follow the steps below to build and run the project using Docker.

### Prerequisites

Before proceeding, make sure you have Docker installed on your machine. If not, you can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

### Build the Docker Image

Use the following command to build the Docker image locally:

```bash
make build
```

### Run the Docker Container

Once the image is built, you can run the Docker container with the following command:

```bash
make run
```

If you prefer not to use Make, you can easily replicate the build and run commands by copying them directly from the Makefile situated in the project's root directory.
