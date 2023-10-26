'use client';

import React, { createContext, useEffect, useState } from 'react';

import useUser, { ProfileProps } from '../hooks/useUser';

export const UserContext = createContext<ProfileContextProps>(
  {} as ProfileContextProps,
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { requestLiffLogin } = useUser();

  const [user, setUser] = useState<ProfileProps>({} as ProfileProps);

  const fetchUser = async () => {
    const storage = localStorage.getItem('591RentHelper');
    const token = storage && JSON.parse(storage).token;
    if (!token) return;
    try {
      const res = await requestLiffLogin(token as string);
      if (res?.success) {
        setUser(res?.data as ProfileProps);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export interface ProfileContextProps {
  user: ProfileProps;
  setUser: React.Dispatch<React.SetStateAction<ProfileProps>>;
}

export default UserProvider;
