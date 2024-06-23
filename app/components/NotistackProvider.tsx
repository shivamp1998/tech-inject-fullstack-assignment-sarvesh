// components/NotistackProvider.js
'use client';

import React from 'react';
import { SnackbarProvider } from 'notistack';

const NotistackProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
