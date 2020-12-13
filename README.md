# Node Cypher

## Project Setup

This application is divided into backend, frontend and database. There is one service for each of them.

### Database

The database is a neo4j image.

When running, its own default browser is available on port 7474.

### Backend

The backend is built with NodeJs and Typescript. 

Takes care of the data migration from the external source
and loading it into the database.

When requested, will also answer with the loaded data on a GET endpoint.

This service runs by default on port 3000, so it will need to be available.

### Frontend

The frontend is built with Vue and Typescript.

When running, will be available on port 8080 and will attempt to load data from the backend.

### Dependencies

To run this project you will need to have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) available.

It is also possible to run it locally, but the database address on the connection driver will have to be updated.
To run it locally, you'll need nodejs, yarn and a neo4j database.

## Usage

After running this command, everything should be available via a browser on the previously mentioned ports:

```docker-compose up -d --build```

This command can be run from the project root, and it should pull and set up the images with everything that is needed for the
application to run.

In the beginning, there will be no data in the database, so the frontend  will not be able to show anything.

To migrate, another command should be run on the correct service:

```docker-compose run --rm --no-deps backend yarn migrate```

This command will execute a migrate command inside the service, which should make the data available to be fetched.

After running this command, should be possible to go to ``http://localhost:8080`` and see the UI with which the user can
interact.

There are also tests available, which can be run on both services doing:

```docker-compose run --rm --no-deps backend yarn jest```

```docker-compose run --rm --no-deps frontend yarn jest```
