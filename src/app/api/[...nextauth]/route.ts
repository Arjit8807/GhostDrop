import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // This is where you would add providers for different sign-in methods,
    // like Google or GitHub. For now, we'll keep this empty.
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
