import { Location, PrismaClient } from '@prisma/client'
import { LocationDto } from '../dto/locationDto'

const prisma = new PrismaClient();

export class LocationService {

    async create(locationDto: LocationDto) {
        const location = await prisma.location.create({
            data: locationDto
        });

        return location;
    }

    async find() {
        const locations = await prisma.location.findMany();

        return locations;
    }

    async findLastLocation(): Promise<Location | null> {
        const mostRecentLocation = await prisma.location.findFirst({
            orderBy: {
                created_at: 'desc'
            }
        })
        return mostRecentLocation;
    }
}

