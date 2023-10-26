'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import useCondition, { ConditionProps } from '../hooks/useCondition';
import { ProfileContextProps, UserContext } from './userContext';

export const ConditionContext = createContext<ConditionContextProps>(
  {} as ConditionContextProps,
);

const ConditionProvider = ({ children }: { children: React.ReactNode }) => {
  const { requestGetConditionList } = useCondition();

  const [conditionList, setConditionList] = useState<ConditionProps[]>([]);
  const { user } = useContext(UserContext) as ProfileContextProps;

  const fetchConditionList = async () => {
    const storage = localStorage.getItem('591RentHelper');
    const token = storage && JSON.parse(storage).token;
    if (!token) return;
    try {
      const res = await requestGetConditionList(user._id as string);
      if (res?.success) {
        setConditionList(res?.data as ConditionProps[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchConditionList();
    }
  }, [user._id]);

  return (
    <ConditionContext.Provider value={{ conditionList, setConditionList }}>
      {children}
    </ConditionContext.Provider>
  );
};

export default ConditionProvider;

export interface ConditionContextProps {
  conditionList: ConditionProps[];
  setConditionList: React.Dispatch<React.SetStateAction<ConditionProps[]>>;
}
