import { Device, PrismaClient } from '@prisma/client'
import { UpdateDeviceDto } from '../dto/device.dto';

const prisma = new PrismaClient();


export class DeviceService {

    async createDevice(available: boolean) {
        const device = await prisma.device.create({
            data: {
                available
            },
        });

        return device;
    }

    async updateDevice(updateDevice: UpdateDeviceDto) {
        const newDevice = await prisma.device.update({
            where: {
                id: updateDevice.id
            },
            data: {
                available: updateDevice.available
            }
        })

        return newDevice
    }

    async getAvailable() {
        const availableDevice = await prisma.device.findFirst({
            where: {
                available: true
            }
        })

        return availableDevice;
    }
}