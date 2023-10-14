import { createContext, useState } from 'react';
import { getRequest, postRequest } from '../../service/http';
import { ConditionExtraProps } from '../../pages/condition';

export const ConditionContext = createContext([] as ConditionExtraProps[]);

const useCondition = () => {
  const [condition, setCondition] = useState<Partial<ConditionExtraProps>>({
    push: true,
    region: '1',
    section: [],
    kind: '',
    price: [] || '',
    min_price: '',
    max_price: '',
    multiRoom: [],
    floor: '',
    other: [],
    shape: [],
    multiArea: [] || '',
    min_area: '',
    max_area: '',
    option: [],
    multiNotice: [],
  });
  const [conditionList, setConditionList] = useState<ConditionExtraProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestGetConditionList = async (uId: string) => {
    try {
      setIsLoading(true);
      const res = await getRequest<ConditionResponseProps>(
        `/api/condition/all/${uId}`
      );
      res?.success && setConditionList(res.data as ConditionExtraProps[]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const requestGetCondition = async (uId: string, number: string) => {
    try {
      setIsLoading(true);
      const res = await getRequest<ConditionResponseProps>(
        `/api/condition/${uId}/${number}`
      );
      res?.success && setCondition(res.data as ConditionExtraProps);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const requestSaveCondition = async (data: ConditionProps) => {
    try {
      setIsLoading(true);
      const res = await postRequest<ConditionResponseProps>(
        `/api/condition/save`,
        data
      );
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const requestChangePush = async (uId: string, number: string) => {
    try {
      setIsLoading(true);
      const res = await postRequest<ConditionResponseProps>(
        `/api/condition/push/${uId}/${number}`,
        {}
      );
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    condition,
    conditionList,
    setCondition,
    isLoading,
    setIsLoading,
    requestGetCondition,
    requestSaveCondition,
    requestChangePush,
    requestGetConditionList,
  };
};

export default useCondition;

export interface ConditionResponseProps {
  success: boolean;
  message: string;
  data?:
    | ConditionProps
    | ConditionProps[]
    | ConditionExtraProps
    | ConditionExtraProps[];
}

export interface ConditionProps {
  push: boolean; // 是否推播
  current_id?: string; // Current id
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
