import { Router, Request, Response } from "express";
import { DeviceController } from "../controller/deviceController";

const deviceRouter = Router();

const deviceController = new DeviceController();

deviceRouter.post('/devices', async (req: Request, res: Response) => {
    try {
        const device = await deviceController.createDevice();

        res.status(201).json(device);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
})

deviceRouter.patch('/devices/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { available } = req.body;
    try {
        const newDevice = await deviceController.updateDevice({id, available});

        res.status(200).json(newDevice);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
})

export default deviceRouter;