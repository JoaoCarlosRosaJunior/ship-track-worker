import { LocationService } from '../service/locationService';
import { OrderService } from '../service/orderService';
import axios from 'axios';
import dotenv from 'dotenv';
import { CreateLocationDto, ThingSpeakDto } from '../dto/loation.dto'

dotenv.config();

const LONGITUDE_RANGE = 360000000;

const API_KEY = process.env.API_KEY;

const BASE_URL = process.env.BASE_URL;

export class LocationController {
    private locationService: LocationService;
    private orderService: OrderService

    constructor() {
        this.locationService = new LocationService();
        this.orderService = new OrderService();
    }

    async createLocation(createLocationDto: CreateLocationDto) {

        try{
            const order = await this.orderService.getOrderByDevice(createLocationDto.deviceId);

            if(!order) {
                throw new Error('No orders from this locaton found, please contact support');
            }

            const data = Object.assign(createLocationDto, { 'orderId': order.id });
            const location = await this.locationService.createLocation(data);
    
            return location;
        } catch(error) {
            return error;
        }
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
            const notDeliveredOrders = await this.orderService.notDeliveredOrders();

            const lastLocationObject = {};

            for (const order of notDeliveredOrders) {
                const lastLocation = await this.locationService.findLastLocation(order.id);
                Object.assign(lastLocationObject, {
                  [order.id]: {
                    dstLat: order.receiverAddrLat,
                    dstLng: order.receiverAddrLng,
                    curLat: lastLocation?.latitude,
                    curLng: lastLocation?.longitude,
                  }
                })
              }

            return lastLocationObject;
        } catch(error) {
            return error;
        }
    }

    async getLastLocationsSerial() {
        try {
            const notDeliveredOrders = await this.orderService.notDeliveredOrders();

            const lastLocationObject = {};

            for (const order of notDeliveredOrders) {
                const lastLocation = await this.locationService.findLastLocation(order.id);
                Object.assign(lastLocationObject, {
                    [order.id]: this.convertLatLngToInt256(lastLocation?.latitude as number, lastLocation?.longitude as number)
                })
              }

            return lastLocationObject;
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

    delay(seg: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seg * 1000));
    }
}