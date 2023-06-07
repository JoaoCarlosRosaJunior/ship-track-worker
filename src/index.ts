import express, { Request, Response } from 'express'
import cors from 'cors';
import { LocationController } from './controller/locationController';
import locationRouter from './routers/locationRouter';
import deviceRouter from './routers/deviceRouter';
import orderRouter from './routers/orderRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const locationController = new LocationController();

app.get('', async(req, res) => {
  res.send("<h1>Working<\h1>")
});

app.use(locationRouter);
app.use(deviceRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});