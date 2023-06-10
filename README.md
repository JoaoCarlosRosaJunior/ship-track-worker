
# Location Worker (Ship Tracking)

This project is a backend system to deal with load location information received by IoT devices and their respective orders. It is part of a more complete system of smart contracts that manage cargo tracking through these devices.

[IoT Code](https://github.com/JoaoCarlosRosaJunior/ship-track-IoT) 

## Stack

**Back-end:** Node, Express e Typescript

**Database:** MySql

**Deployment**: Flyio

**Database Hosting**: PlaneScale

## Want to access the backend?
We've deployed our system using [Flyio](https://fly.io/), you can access through the host [ship-track.fly.dev](https://ship-track.fly.dev).

Our routes are listed on the [Postman Collection](./docs)

## Running Locally

1. Clone the project

```bash
  git clone https://github.com/JoaoCarlosRosaJunior/ship-track-worker
```

2. Install the Dependencies

```bash
  npm install
```

3. Run the docker-compose

```bash
  docker-compose up -d
```
For more references on [docker compose up -d](https://docs.docker.com/engine/reference/commandline/compose_up/)

4. Run prisma migrate on the docker container
```bash
  docker-compose exec app npx prisma migrate dev --name init
```
5. Acess the application on [localhost](http://localhost:3000)

