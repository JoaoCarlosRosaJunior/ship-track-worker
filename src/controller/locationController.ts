import { LocationService } from '../service/locationService';

const LONGITUDE_RANGE = 360000000; // in microdegrees

export class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    async getLocations() {
        try {
            const locations = await this.locationService.find();
            return locations;
        } catch (error: any) {
            return error.message;
        }
    }

    async createLocation(latitude: string, longitude: string, deviceId: string) {
        try {
            const location = await this.locationService.create({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                deviceId: parseInt(deviceId),
            });
            return location;
        } catch(error) {
            return error;
        }
    }

    async getLastLocation() {
        try {
            const lastLocation = await this.locationService.findLastLocation();
            const lat = lastLocation?.latitude
            const lng = lastLocation?.longitude
            const binLocation = this.convertLatLngToInt256(lat as number * 1000000, lng as number * 1000000)
            return binLocation;
        } catch(error) {
            return error;
        }
    }

    convertLatLngToInt256(lat: number, lng: number ): number {
        const latInt = BigInt(lat) << BigInt(32);
        const lngInt = BigInt(lng + LONGITUDE_RANGE);
        const latLngInt = latInt | lngInt;
        return Number(latLngInt);
    }      
}