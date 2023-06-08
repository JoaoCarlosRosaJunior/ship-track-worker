import { device, PrismaClient } from '@prisma/client'
import { UpdateDeviceDto } from '../dto/device.dto';

const prisma = new PrismaClient();


export class DeviceService {

    async createDevice(id: number,available: boolean) {
        const device = await prisma.device.create({
            data: {
                id,
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

    async getAllDevices() {
        const devices = await prisma.device.findMany();

        return devices;
    }
}