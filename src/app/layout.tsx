'use client';

import liff from '@line/liff';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter, useSearchParams } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import React, { Suspense, useEffect } from 'react';

import ConditionProvider from '@/applications/contexts/conditionContext';
import UserProvider from '@/applications/contexts/userContext';
import Header from '@/components/Layout/Header';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

import Loading from './loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const appInit = async () => {
    try {
      await liff.init({
        liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID as string,
      });
      if (!liff.isLoggedIn()) {
        await liff.login();
      }
      if (searchParams.get('code')) router.replace('/');
      const id_token = await liff.getIDToken();

      const storage = {
        token: id_token,
      };

      localStorage.setItem('591RentHelper', JSON.stringify(storage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    appInit();
  }, []);

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ConditionProvider>
            <SnackbarProvider maxSnack={3}>
              <ThemeRegistry>
                <Container maxWidth="sm">
                  <Header />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      bgcolor: 'background.default',
                      pt: ['72px', '80px', '84px'],
                      height: '100%',
                    }}
                  >
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </Box>
                </Container>
              </ThemeRegistry>
            </SnackbarProvider>
          </ConditionProvider>
        </UserProvider>
      </body>
    </html>
  );
}
