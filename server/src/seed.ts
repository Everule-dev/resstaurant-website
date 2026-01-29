import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const menuItems = [
    // Appetizers
    {
        name: "Crispy Calamari",
        description: "Golden fried squid rings served with tangy marinara sauce and lemon wedges",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
        category: "appetizers",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Bruschetta Trio",
        description: "Toasted artisan bread topped with fresh tomatoes, basil, and balsamic glaze",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
        category: "appetizers",
        isAvailable: true,
    },
    {
        name: "Loaded Nachos",
        description: "Crispy tortilla chips with melted cheese, jalapeños, guacamole, and sour cream",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop",
        category: "appetizers",
        isPopular: true,
        isAvailable: true,
    },
    // Main Course
    {
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta with creamy egg sauce, crispy pancetta, and parmesan",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
        category: "main-course",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Chicken Alfredo",
        description: "Grilled chicken breast over fettuccine in a rich, creamy alfredo sauce",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop",
        category: "main-course",
        isAvailable: true,
    },
    {
        name: "Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms, white wine, and fresh herbs",
        price: 17.99,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
        category: "main-course",
        isAvailable: true,
    },
    // Grills
    {
        name: "Ribeye Steak",
        description: "12oz premium ribeye grilled to perfection, served with garlic butter",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
        category: "grills",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "BBQ Baby Back Ribs",
        description: "Fall-off-the-bone tender ribs glazed with our signature smoky BBQ sauce",
        price: 28.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        category: "grills",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Grilled Lamb Chops",
        description: "Herb-marinated lamb chops with mint sauce and roasted vegetables",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
        category: "grills",
        isAvailable: true,
    },
    // Seafood
    {
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon dill sauce and seasonal vegetables",
        price: 26.99,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        category: "seafood",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Shrimp Scampi",
        description: "Jumbo shrimp sautéed in garlic butter, white wine, and fresh herbs",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",
        category: "seafood",
        isAvailable: true,
    },
    {
        name: "Lobster Tail",
        description: "Butter-poached Maine lobster tail with drawn butter and lemon",
        price: 42.99,
        image: "https://images.unsplash.com/photo-1553247407-23251ce81f59?w=400&h=300&fit=crop",
        category: "seafood",
        isAvailable: true,
    },
    // Desserts
    {
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
        category: "desserts",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
        category: "desserts",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "New York Cheesecake",
        description: "Creamy cheesecake with graham cracker crust and berry compote",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
        category: "desserts",
        isAvailable: true,
    },
    // Drinks
    {
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice, perfect start to your meal",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        category: "drinks",
        isAvailable: true,
    },
    {
        name: "Mango Smoothie",
        description: "Tropical blend of fresh mango, yogurt, and honey",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
        category: "drinks",
        isPopular: true,
        isAvailable: true,
    },
    {
        name: "Classic Mojito",
        description: "Refreshing mint cocktail with lime, rum, and soda water",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
        category: "drinks",
        isAvailable: true,
    },
];

async function main() {
    console.log('Start seeding ...');

    // Clear existing items
    await prisma.menuItem.deleteMany();

    for (const item of menuItems) {
        const menuItem = await prisma.menuItem.create({
            data: item,
        });
        console.log(`Created menu item with id: ${menuItem.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
