import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: { userId: string };
}

export const createReservation = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, phone, date, time, partySize } = req.body;
        // Optional: link to user if logged in, but allowing guest reservations as per schema design (userId optional)
        const userId = req.user?.userId || null;

        const reservation = await prisma.reservation.create({
            data: {
                userId,
                name,
                email,
                phone,
                date: new Date(date), // Ensure date is ISO-8601 compatible string from frontend
                time,
                partySize: Number(partySize),
                status: 'confirmed',
            },
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating reservation' });
    }
};

export const getUserReservations = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const reservations = await prisma.reservation.findMany({
            where: { userId: req.user.userId },
            orderBy: { date: 'desc' },
        });

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations' });
    }
};
