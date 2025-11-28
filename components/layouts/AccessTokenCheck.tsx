'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { create } from 'zustand';
export const useAccessTokenStore = create<string | null>(() => null);

const AccessTokenCheck = () => {
  const accessTokenStore = useAccessTokenStore();
  const router = useRouter();

  useEffect(() => {
    if (accessTokenStore) {
      router.refresh();
    }
  }, [accessTokenStore, router]);

  return null;
};

export default AccessTokenCheck;
