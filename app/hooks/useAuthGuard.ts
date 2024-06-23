// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

const useAuthGuard = () => {
  const router = useRouter();
  
  useEffect(() => {
    const cookies = parseCookies();
    console.log ("is this cookie working", cookies)
    if (cookies.token) {
      router.push('/dashboard');
    }
  }, [router]);
};

export default useAuthGuard;
