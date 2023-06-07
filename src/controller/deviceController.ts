import { UpdateDeviceDto } from "../dto/device.dto";
import { DeviceService } from "../service/deviceService";

export class DeviceController {
    private deviceService: DeviceService;

    constructor() {
        this.deviceService = new DeviceService();
    }

    async createDevice() {
        try {
            const device = await this.deviceService.createDevice(true);
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

    async getDevices() {} // Return all devices

    async getDevice() {} // Return device and last location of the device
}