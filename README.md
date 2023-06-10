
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

1. Clone o projeto

```bash
  git clone https://github.com/JoaoCarlosRosaJunior/ship-track-worker
```

2. Install the Dependencies

```bash
  npm install
```

3. Running database Locally
3.1. Rename the [.env.local](.env.local) to *.env*

3.2. Define your MySql variables on the *.env* file

3.3. Run the docker-compose

```bash
  docker-compose up
```
For more references on [docker-compose up -d](https://docs.docker.com/engine/reference/commandline/compose_up/)

4. Run prisma
```bash
  npx prisma generate
```

5. Run the project
```bash
  npm run dev
```


