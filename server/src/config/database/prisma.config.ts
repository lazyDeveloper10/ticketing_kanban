import { PrismaClient } from '@prisma/client';

interface PrismaInterface {
	prisma: PrismaClient;
}

declare const global: PrismaInterface;

export const prisma = global.prisma || new PrismaClient();
