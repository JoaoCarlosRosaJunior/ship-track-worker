export interface LocationDto {
    latitude: number;
    longitude: number;
    deviceId: number;
}

export interface ThingSpeakDto {
    entry_id: number,
    field1: string,
    field2: string,
    field3: string,
    created_at: string
}

export interface CreateLocationDto {
    deviceId: number,
    latitude: number,
    longitude: number
}

export interface CreateLocationServiceDto {
    deviceId: number,
    orderId: string,
    latitude: number,
    longitude: number
}

export interface CreateTestLocationDto {
    orderId: string,
    latitude: number,
    longitude: number
}