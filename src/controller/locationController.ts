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
            let lat, lng;
            if(!lastLocation) {
                const order = await this.orderService.getOrderById(id)
                lat = order?.senderAddrLat;
                lng = order?.senderAddrLng;
            } else {
                lat = lastLocation.latitude;
                lng = lastLocation.longitude;
            }
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
                if(!lastLocation) {
                    Object.assign(lastLocationObject, {
                        [order.id]: {
                          dstLat: order.receiverAddrLat,
                          dstLng: order.receiverAddrLng,
                          srcLat: order.senderAddrLat,
                          srcLng: order.senderAddrLng,
                        }
                      })
                }
                Object.assign(lastLocationObject, {
                  [order.id]: {
                    dstLat: order.receiverAddrLat,
                    dstLng: order.receiverAddrLng,
                    curLat: lastLocation?.latitude,
                    curLng: lastLocation?.longitude,
                    srcLat: order.senderAddrLat,
                    srcLng: order.senderAddrLng,
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

            let lat, lng;

            for (const order of notDeliveredOrders) {
                const lastLocation = await this.locationService.findLastLocation(order.id);
                if(!lastLocation) {
                    lat = order.senderAddrLat;
                    lng = order.senderAddrLng;
                } else {
                    lat = lastLocation.latitude;
                    lng = lastLocation.longitude;
                }
                Object.assign(lastLocationObject, {
                    [order.id]: this.convertLatLngToInt256(lat as number, lng as number)
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
}