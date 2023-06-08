export interface CreateOrderDto {
    id: string;
    senderWallet: string;
    receiverWallet: string;
    senderAddress: string;
    receiverAddress: string;
    receiverAddrLat: number;
    receiverAddrLng: number;
    expectedTime: Date;
}

export interface CreateOrderServiceDto {
    id: string;
    deviceId: number;
    senderWallet: string;
    receiverWallet: string;
    senderAddress: string;
    receiverAddress: string;
    expectedTime: Date;
}