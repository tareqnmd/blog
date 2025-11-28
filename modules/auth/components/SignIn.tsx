'use client';

import Button from '@/components/ui/Button';
import { signIn } from 'next-auth/react';
import { BsGoogle } from 'react-icons/bs';

const SignIn = () => {
  const handleSignIn = async () => {
    await signIn('google');
  };

  return (
    <Button onClick={handleSignIn} icon={<BsGoogle />}>
      Sign In with Google
    </Button>
  );
};

export default SignIn;
