import { Router, Request, Response } from "express";
import { CreateOrderDto } from "../dto/order.dto";
import { OrderController } from "../controller/orderController";

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.post('/order', async (req: Request, res: Response) => {
    try {
        const order = await orderController.createOrder({
            id: req.body.id,
            senderWallet: req.body.senderWallet,
            receiverWallet: req.body.receiverWallet,
            senderAddress: req.body.senderAddress,
            receiverAddress: req.body.receiverAddress,
            receiverAddrLat: Number(req.body.receiverAddrLat),
            receiverAddrLng: Number(req.body.receiverAddrLng),
            expectedTime: new Date(req.body.expectedTime),
            senderAddrLat: Number(req.body.receiverAddrLat),
            senderAddrLng: Number(req.body.receiverAddrLng),
        });

        res.status(201).json(order)
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
});


orderRouter.patch('/order/:id',async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deliveredOrder = await orderController.deliveredOrder(id);
        res.status(200).json(deliveredOrder);
    } catch(error: any) {
        res.status(500).json({error: error.message});
    }
});

export default orderRouter;