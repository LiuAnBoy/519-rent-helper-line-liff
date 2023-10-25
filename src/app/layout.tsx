'use client';

import liff from '@line/liff';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/applications/hooks/useUser';
import useUser, { ProfileProps } from '@/applications/hooks/useUser';
import Header from '@/components/Layout/Header';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { requestLiffLogin } = useUser();

  const [user, setUser] = useState<ProfileProps>({} as ProfileProps);
  // const [conditionList, setConditionList] = React.useState<ConditionProps[]>(
  //   []
  // );

  const appInit = async () => {
    try {
      await liff.init({
        liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID as string,
      });
      if (!liff.isLoggedIn()) {
        await liff.login();
      }
      if (searchParams.get('code')) router.replace('/');
      // setIsLoading(true);
      const id_token = await liff.getIDToken();

      const storage = {
        token: id_token,
      };

      localStorage.setItem('591RentHelper', JSON.stringify(storage));

      const res = await requestLiffLogin(id_token as string);
      console.log(res);
      if (res?.success) {
        setUser(res.data);
        //   const conditionResponse = await requestGetConditionList(res.data._id);
        //   if (conditionResponse?.success) {
        //     setConditionList(conditionResponse.data as ConditionProps[]);
        //   }
      }

      // setIsLoading(false);
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
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeRegistry>
            <Container maxWidth="sm">
              <Header />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  mt: ['48px', '56px', '64px'],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </Container>
          </ThemeRegistry>
        </UserContext.Provider>
      </body>
    </html>
  );
}
