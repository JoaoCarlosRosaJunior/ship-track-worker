import { OrderService } from "../service/orderService";
import { DeviceService } from "../service/deviceService";
import { CreateOrderDto } from "../dto/order.dto";

export class OrderController {
    private orderService: OrderService;
    private deviceService: DeviceService;

    constructor() {
        this.orderService = new OrderService();
        this.deviceService = new DeviceService();
    }

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const device = await this.deviceService.getAvailable();
            if(!device) {
                return "Device não disponível";
            }
    
            const createOrderService = Object.assign(createOrderDto, {
                deviceId: device.id
            })
    
            const order = await this.orderService.create(createOrderService);

            return order;
        } catch(error) {
            return error;
        }
    }

    async deliveredOrder(id: string) {
        try {
            const deliveredOrder = await this.orderService.deliverOrder(id);

            await this.deviceService.updateDevice({
                id: deliveredOrder.deviceId, 
                available: true,
            });

            return deliveredOrder;
        } catch(error) {
            return error;
        }
    }
}