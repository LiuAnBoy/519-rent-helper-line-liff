import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import liff from '@line/liff';
import { CircularProgress } from '@mui/material';
import NabBar from './presentation/layout/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import routes, { RouteProps } from './routes';
import Content from './presentation/layout/Content';
import vConsole from './application/vConsole';
import { useSearchParams } from 'react-router-dom';
import useUser, { UserContext } from './application/hook/useUser';
import useCondition, {
  ConditionContext,
} from './application/hook/useCondition';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

export default function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, requestGetUser, isLoading, setIsLoading, requestRegister } =
    useUser();
  const { conditionList, requestGetConditionList } = useCondition();

  const appInit = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID as string });
      if (!liff.isLoggedIn()) {
        try {
          await liff.login();
          const id_Token = await liff.getIDToken();
          await requestRegister(id_Token as string);
        } catch (error) {}
      } else {
        setIsLoading(true);
        const id_token = await liff.getIDToken();

        const storage = {
          token: id_token,
        };
        localStorage.setItem('591RentHelper', JSON.stringify(storage));

        const res = await requestGetUser();
        if (!res?.success) {
          await requestRegister(id_token as string);
        }
        await requestGetConditionList(res?.data._id as string);

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    appInit();
  }, []);

  // React.useEffect(() => {
  //   if (process.env.NODE_ENV === 'development') {
  //     vConsole.show();
  //   }
  // }, []);

  if (isLoading) {
    return (
      <Box
        component='div'
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <ConditionContext.Provider value={conditionList}>
        <SnackbarProvider maxSnack={3}>
          <Container maxWidth='sm'>
            <NabBar />
            <Content>
              <Routes>
                {routes.map((route: RouteProps) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.view />}
                  />
                ))}
              </Routes>
            </Content>
          </Container>
        </SnackbarProvider>
      </ConditionContext.Provider>
    </UserContext.Provider>
  );
}

export interface ProfileResponseProps {
  success: boolean;
  data: ProfileProps;
}

export interface ProfileProps {
  _id: string;
  name: string;
  email: string;
  picture: string;
  line_id: string;
  condition: number;
  notify_token: string;
  exp: number;
  iat: number;
}

export interface ConditionProps {
  push: boolean; // 是否推播
  current_id: string; // Current id
  number: string; // condition number
  user_id: string; // user id
  floor: string; // 樓層
  shape: string; // 型態
  kind: string; // 類型
  multiArea: string; // 坪數
  multiNotice: string; // 須知
  multiRoom: string; // 格局
  option: string; // 設備
  other: string; // 特色
  region: string; // 地區
  section: string; // 位置
  price: string; // 租金
}
