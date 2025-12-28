'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const SignInButton = () => {
  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <button
      onClick={handleSignIn}
      className="text-sm border border-border rounded-md px-3 py-1.5 cursor-pointer hover:bg-accent/10 transition-colors flex items-center gap-2"
    >
      <FaGoogle className="text-foreground w-4 h-4" />
      <span>Sign in</span>
    </button>
  );
};

export default SignInButton;
