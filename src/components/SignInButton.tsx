'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';

export default function SignInButton() {
    //current session data
    const { data: session } = useSession();
    if (session) {
        return (
      <button
        onClick={() => signOut()}
        className="rounded-full bg-red-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-red-600"
      >
        Sign out
      </button>
    );
  }


  //if no session exit then we start sign in
   return (
    <button
      onClick={() => signIn()}
      className="rounded-full bg-green-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-green-600"
    >
      Sign in
    </button>
  );
}