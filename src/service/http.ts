import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const checkToken = () => {
  const storage = localStorage.getItem('591RentHelper');

  const token = storage ? JSON.parse(storage).token : null;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const getRequest = async <T>(endPoint: string) => {
  checkToken();

  try {
    const res = await instance.get<T>(endPoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/* eslint @typescript-eslint/no-explicit-any:0 */
export const postRequest = async <T>(endPoint: string, body?: any) => {
  checkToken();

  try {
    const res = await instance.post<T>(endPoint, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const putRequest = async <T>(endPoint: string, body?: any) => {
  checkToken();

  try {
    const res = await instance.put<T>(endPoint, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const patchRequest = async <T>(endPoint: string, body?: any) => {
  checkToken();

  try {
    const res = await instance.patch<T>(endPoint, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteRequest = async <T>(endPoint: string) => {
  checkToken();

  try {
    const res = await instance.delete<T>(endPoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Http = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  patch: patchRequest,
  delete: deleteRequest,
};

export default Http;
