    import { PrismaClient } from './src/generated/prisma/index.js';
    const prisma = new PrismaClient();

    async function main() {
      try {
        const result = await prisma.message.deleteMany({});
        console.log(`Deleted ${result.count} messages.`);
      } catch (error) {
        console.error("Error deleting messages:", error);
      } finally {
        await prisma.$disconnect();
      }
    }

    main();
    
