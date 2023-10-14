import React, { createContext, useState } from 'react';
import { getRequest, postRequest } from '../../service/http';

export const UserContext = createContext({});

const useUser = () => {
  const [user, setUser] = useState<ProfileProps>({
    _id: '',
    name: '',
    email: '',
    picture: '',
    line_id: '',
    condition: 0,
    notify_token: '',
    exp: 0,
    iat: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestGetUser = async () => {
    try {
      const res = await getRequest<ProfileResponseProps>('/auth/user/me');
      res?.success && setUser(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const requestRegister = async (id_token: string) => {
    const data = {
      id_token,
    };

    try {
      const res = await postRequest<ProfileResponseProps>(
        '/auth/register',
        data
      );
      res?.success && setUser(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    requestGetUser,
    requestRegister,
  };
};

export default useUser;

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
