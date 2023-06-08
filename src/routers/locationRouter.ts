import { LocationController } from "../controller/locationController";
import { Router, Request, Response } from "express";

const locationController = new LocationController();

const locationRouter = Router();


locationRouter.get('/locations/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const locations = await locationController.getLocations(orderId);
    res.status(200).json(locations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

locationRouter.post('/locations/start', async (req: Request, res: Response) => {
  try {
    await locationController.initializeThingSpeakRoutineConfig();
    locationController.starThingSpeakRoutine();
    res.status(200).json({message: "Routine started"});
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

locationRouter.post('/locations/stop', async (req: Request, res: Response) => {
  locationController.routine = false;
  res.status(500).json({message: "Routine stoped"});
})
  
locationRouter.get('/locations/last/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const lastLocation = await locationController.getLastLocationById(id as string);
    res.status(200).json({location: lastLocation});
  } catch(error: any) {
    res.send(500).json({ error: error.message })
  }
});

/**
 * TODOD: change return change:
 * {
"0xer-dfapdsfipj2-89034": {
dstLat: 123,
dstLng: 123,
curLat: 123,
curLng: 123,
},
"0xer-dfapdsfipj2-89034": {
dstLat: 123,
dstLng: 123,
curLat: 123,
curLng: 123,
},
}
 */

locationRouter.get('/location/last', async (req: Request, res: Response) => {
  try {
    const lastLocations = await locationController.getLastLocations();
    res.status(200).json(lastLocations);
  } catch(error: any) {
    res.status(500).json({error: error.message});
  }
});

export default locationRouter;