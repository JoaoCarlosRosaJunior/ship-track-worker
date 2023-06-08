import { UpdateDeviceDto } from "../dto/device.dto";
import { DeviceService } from "../service/deviceService";

export class DeviceController {
    private deviceService: DeviceService;

    constructor() {
        this.deviceService = new DeviceService();
    }

    async createDevice(id: number) {
        try {
            const device = await this.deviceService.createDevice(id, true);
            return device;
        } catch(error) {
            return error;
        }
    }

    async updateDevice(updateDeviceDto: UpdateDeviceDto) {
        try {
            const newDevice = await this.deviceService.updateDevice(updateDeviceDto);
            return newDevice;
        } catch(error) {
            return error
        }
    }

    async getAllDevices() {
        try {
            const devices = await this.deviceService.getAllDevices();
            return devices;
        } catch(error) {
            return error;
        }
    }
}