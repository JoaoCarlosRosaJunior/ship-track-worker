import { LocationController } from "../controller/locationController";
import { Router, Request, Response } from "express";

const locationController = new LocationController();

const locationRouter = Router();

locationRouter.get('/locations', async (req: Request, res: Response) => {
    try {
      const locations = await locationController.getLocations();
      res.status(200).json(locations);
    } catch(error: any) {
      res.status(500).json({error: error.message});
    }
});
  
locationRouter.post('/locations',  async (req: Request, res: Response) => {
    const { latitude, longitude, deviceId } = req.query;
    try {
      const location = await locationController.createLocation(latitude as string, longitude as string, deviceId as string);
      res.status(200).json(location);
    } catch(error: any) {
      res.status(500).json({ error: error.message });
    }
});
  
locationRouter.get('/locations/last', async (req: Request, res: Response) => {
    try {
      const lastLocation = await locationController.getLastLocation();
      res.status(200).json({location: lastLocation});
    } catch(error: any) {
      res.send(500).json({ error: error.message })
    }
});

export default locationRouter;