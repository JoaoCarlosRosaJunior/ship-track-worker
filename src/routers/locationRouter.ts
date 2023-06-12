import { LocationController } from "../controller/locationController";
import { Router, Request, Response } from "express";

const locationController = new LocationController();

const locationRouter = Router();

locationRouter.post('/locations/test', async (req: Request, res: Response) => {
  try {
    const createdLocationTest = await locationController.createTestLocation({
      orderId: req.body.orderId,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude)
    });
    res.status(201).json(createdLocationTest);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
})

locationRouter.post('/locations', async (req: Request, res: Response) => {
  try {
    const createdLocation = await locationController.createLocation({
      deviceId: Number(req.body.deviceId),
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude)
    });
    res.status(201).json(createdLocation);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
})


locationRouter.get('/locations/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const locations = await locationController.getLocations(orderId);
    res.status(200).json(locations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});
  
locationRouter.get('/locations/last/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const lastLocation = await locationController.getLastLocationById(id as string);
    res.status(200).json({location: lastLocation});
  } catch(error: any) {
    res.send(500).json({ error: error.message })
  }
});

locationRouter.get('/location/last', async (req: Request, res: Response) => {
  try {
    const lastLocations = await locationController.getLastLocations();
    res.status(200).json(lastLocations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

locationRouter.get('/location/lastSerial', async (req: Request, res: Response) => {
  try {
    const lastLocations = await locationController.getLastLocationsSerial();
    res.status(200).json(lastLocations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

export default locationRouter;