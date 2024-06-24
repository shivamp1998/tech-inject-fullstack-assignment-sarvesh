'use client'
import react, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/login')
    }, [])
    return (<></>)
}

export default MainPage;