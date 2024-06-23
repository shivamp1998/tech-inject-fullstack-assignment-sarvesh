'use client'
import React from 'react';
import useAuthGuard from '../hooks/useAuthGuard';

const AuthGuard = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  useAuthGuard();
  return <>{children}</>;
};

export default AuthGuard;
