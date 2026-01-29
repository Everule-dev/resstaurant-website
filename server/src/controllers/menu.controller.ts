import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const items = await prisma.menuItem.findMany({ where: { isAvailable: true } });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

export const getMenuItemsByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID required' });
        }
        const items = await prisma.menuItem.findMany({
            where: { category: String(categoryId), isAvailable: true },
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

export const searchMenuItems = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ message: 'Search query required' });
        }

        const items = await prisma.menuItem.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                ],
                isAvailable: true,
            },
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error searching items' });
    }
};
