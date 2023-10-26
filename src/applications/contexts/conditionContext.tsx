'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import useCondition, { ConditionProps } from '../hooks/useCondition';
import { ProfileContextProps, UserContext } from './userContext';

export const ConditionContext = createContext<ConditionContextProps>(
  {} as ConditionContextProps,
);

const ConditionProvider = ({ children }: { children: React.ReactNode }) => {
  const { requestGetConditionList } = useCondition();
  const { user } = useContext(UserContext) as ProfileContextProps;

  const [conditionList, setConditionList] = useState<ConditionProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConditionList = async () => {
    setIsLoading(true);
    const storage = localStorage.getItem('591RentHelper');
    const token = storage && JSON.parse(storage).token;
    if (!token) return;
    try {
      const res = await requestGetConditionList(user._id as string);
      if (res?.success) {
        setConditionList(res?.data as ConditionProps[]);
      }
      setIsLoading(false);
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
    <ConditionContext.Provider
      value={{ conditionList, setConditionList, isLoading }}
    >
      {children}
    </ConditionContext.Provider>
  );
};

export default ConditionProvider;

export interface ConditionContextProps {
  conditionList: ConditionProps[];
  setConditionList: React.Dispatch<React.SetStateAction<ConditionProps[]>>;
  isLoading?: boolean;
}
