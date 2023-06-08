import { PrismaClient } from "@prisma/client";
import { CreateOrderServiceDto } from "../dto/order.dto";

const prisma = new PrismaClient();

export class OrderService {
    async create(createOrderDto: CreateOrderServiceDto) {
        const order = await prisma.order.create({
            data: createOrderDto,
        });

        return order;
    };

    async deliverOrder(id: string) {
        const deliveredOrder = await prisma.order.update({
            where: {
                id
            },
            data: {
                delivered: true
            }
        })

        return deliveredOrder;
    };

    async orderDeviceMap() {
        const orders = await prisma.order.findMany({
          where: { delivered: false },
          select: { deviceId: true, id: true },
        });

        return orders;
    }

    async notDeliveredOrders() {
        const orders = await prisma.order.findMany({
            where: {delivered: false},
            select: {id: true, receiverAddrLat: true, receiverAddrLng: true}
        });

        return orders;
    }
}