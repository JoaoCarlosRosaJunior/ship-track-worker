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
}