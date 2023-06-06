import express, { Request, Response } from 'express'
import cors from 'cors';
import { LocationController } from './controller/locationController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const locationController = new LocationController();

app.get('', async(req, res) => {
  res.send("<h1>DEU CERTO PORRA<\h1>")
});

app.get('/locations', async (req: Request, res: Response) => {
  try {
    const locations = await locationController.getLocations();
    res.status(200).json(locations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

app.post('/locations',  async (req: Request, res: Response) => {
  const { latitude, longitude, deviceId } = req.query;
  try {
    const location = await locationController.createLocation(latitude as string, longitude as string, deviceId as string);
    res.status(200).json(location);
  } catch(error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/locations/last', async (req: Request, res: Response) => {
  try {
    const lastLocation = await locationController.getLastLocation();
    res.status(200).json({location: lastLocation});
  } catch(error: any) {
    res.send(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});