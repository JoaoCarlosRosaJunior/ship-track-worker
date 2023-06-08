import { Router, Request, Response } from "express";
import { DeviceController } from "../controller/deviceController";

const deviceRouter = Router();

const deviceController = new DeviceController();

deviceRouter.post('/device', async (req: Request, res: Response) => {
    const id = Number(req.body.id);
    try {
        const device = await deviceController.createDevice(id);

        res.status(201).json(device);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
});

deviceRouter.patch('/device/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { available } = req.body;
    try {
        const newDevice = await deviceController.updateDevice({id, available});

        res.status(200).json(newDevice);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
});

deviceRouter.get('/device', async (req: Request, res: Response) => {
    try {
        const devices = await deviceController.getAllDevices();
        res.status(200).json(devices);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
});

export default deviceRouter;