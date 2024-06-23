'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Update to use next/navigation
import { parseCookies } from 'nookies';

const useAuthGuard = () => {
  const router = useRouter();
  
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) {
      router.push('/dashboard');
    }
  }, [router]);
};

export default useAuthGuard;
