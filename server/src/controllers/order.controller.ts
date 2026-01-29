import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: { userId: string };
}

export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        const { items, total } = req.body;

        const order = await prisma.order.create({
            data: {
                userId: req.user.userId,
                total,
                status: 'pending',
                items: {
                    create: items.map((item: any) => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: {
                    include: { menuItem: true }
                }
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const orders = await prisma.order.findMany({
            where: { userId: req.user.userId },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
