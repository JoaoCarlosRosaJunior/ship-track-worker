import { LocationService } from '../service/locationService';
import { OrderService } from '../service/orderService';
import axios from 'axios';
import dotenv from 'dotenv';
import { ThingSpeakDto } from '../dto/loation.dto'

dotenv.config();

const LONGITUDE_RANGE = 360000000;

const API_KEY = process.env.API_KEY;

const BASE_URL = process.env.BASE_URL;

export class LocationController {
    private locationService: LocationService;
    private orderService: OrderService
    private orderDeviceMapping: Map<number, string> | undefined;
    public routine: boolean | undefined;
    private lastLocationEntryId: number | undefined;

    constructor() {
        this.locationService = new LocationService();
        this.orderService = new OrderService();
    }

    async initializeThingSpeakRoutineConfig() {

        try {
            const orderDeviceMap = await this.orderService.orderDeviceMap();
            this.orderDeviceMapping = this.transformOrdersToMap(orderDeviceMap);
            this.routine = true;
            const lastLocationEntry = await this.locationService.findLastId();
            this.lastLocationEntryId = lastLocationEntry?.id;
            return true;
        } catch(error) {
            return error;
        }
    }

    transformOrdersToMap(orders: { deviceId: number; id: string }[]): Map<number, string> {
        const orderDeviceMap = new Map<number, string>();
        orders.forEach((order) => {
          orderDeviceMap.set(order.deviceId, order.id);
        });
        return orderDeviceMap;
    }

    starThingSpeakRoutine() {
        this.thingSpeakRoutine();
    }

    async thingSpeakRoutine() {
        if(!this.routine) {
            return ;
        }

        if(!this.lastLocationEntryId) {
            throw new Error('Unknown error, please contact suport');
        }

        const locationsToSave = await this.getThingSpeakData(this.lastLocationEntryId);

        if(locationsToSave != 0) {
            const countSavedLocations = await this.locationService.createManyLocations(locationsToSave);

            this.lastLocationEntryId += countSavedLocations;
        }

        //APLICAR TIMEOUT AQUI
        await this.thingSpeakRoutine();
    }

    async getLastEntries(lastId: number) {
        try {
          const response = await axios.get(`${BASE_URL}/channels/2177175/feeds.json?api_key=${API_KEY}&results=1`);
          return response.data.channel.last_entry_id - lastId;
        } catch(error) {
          return error;
        }
    }

    async getThingSpeakData(lastId: number) {
        const missingData = await this.getLastEntries(lastId);
        if(missingData != 0) {
            const response = await axios.get(`${BASE_URL}/channels/2177175/feeds.json?api_key=${API_KEY}&results=${missingData}`);
            const formatedData = response.data.feeds.map((location: ThingSpeakDto) => {
                return {
                    id: location.entry_id,
                    latitude: Number(location.field1),
                    longitude: Number(location.field2),
                    deviceId: Number(location.field3),
                    createdAt: new Date(location.created_at),
                    orderId: this.orderDeviceMapping?.get(location.entry_id)
                }
            });

            return formatedData;
        }
        return 0;
    }

    async getLocations(orderId: string) {
        try {
            const locations = await this.locationService.find(orderId);
            return locations;
        } catch (error: any) {
            return error.message;
        }
    }

    async getLastLocationById(id: string) {
        try {
            const lastLocation = await this.locationService.findLastLocation(id);
            const lat = lastLocation?.latitude;
            const lng = lastLocation?.longitude;
            const binLocation = this.convertLatLngToInt256(lat as number, lng as number);
            return binLocation;
        } catch(error) {
            return error;
        }
    }

    async getLastLocations() {
        try {
            const notDeliveredOrdersId = await this.orderService.notDeliveredOrders();

            const lastLocations = await Promise.all(
                notDeliveredOrdersId.map(async id => {
                  const lastLocation = await this.locationService.findLastLocation(id);
                  return {
                    orderId: lastLocation?.orderId,
                    latitude: lastLocation?.latitude,
                    longitude: lastLocation?.longitude
                  };
                })
            );

            return lastLocations;
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