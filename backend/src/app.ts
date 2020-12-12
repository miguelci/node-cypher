import express, { Request, Response } from 'express';
import Load from './database/load';

const cors = require('cors');
const compression = require('compression');

const app = express();
app.use(compression());

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.get('/tree', cors(corsOptions), (request: Request, response: Response) => (new Load()).start()
  .then((result) => response.send(result)));

app.use((request: Request, response: Response) => response.sendStatus(404));

export default app;
