import { location, PrismaClient } from '@prisma/client'
import { CreateLocationServiceDto } from '../dto/loation.dto';

const prisma = new PrismaClient();

export class LocationService {

    async createLocation(createLocationServiceDto: CreateLocationServiceDto) {
        const location = await prisma.location.create({
            data: createLocationServiceDto
        })

        return location;
    }

    async find(orderId: string) {
        const locations = await prisma.location.findMany({
            where: {
                orderId: orderId,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return locations.map(location => {
            return {
                lat: location.latitude / 1000000,
                lng: location.longitude / 1000000
            }
        });
    }

    async findLastId(): Promise<location | null> {
        const location = await prisma.location.findFirst({
            orderBy: {
                id: 'desc'
            }
        });

        return location;
    }

    async findLastLocation(id: string): Promise<location | null> {
        const mostRecentLocation = await prisma.location.findFirst({
            where: {
                orderId: id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return mostRecentLocation;
    }

    async createManyLocations(locations: location[]) {
        const createdLocations = await prisma.location.createMany({
            data: locations,
        });

        return createdLocations.count;
    }
}

