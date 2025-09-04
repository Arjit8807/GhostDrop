// import { PrismaAdapter } from '@next-auth/prisma-adapter';


// import NextAuth from 'next-auth';
// import { PrismaClient } from './src/generated/prisma';

// const prisma = new PrismaClient();

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     // This is where you would add providers for sign-in methods.
//   ],
// });


import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      // This is where you would add providers for different sign-in methods,
      // like Google or GitHub. For now, we'll keep this empty.
    ],
  };