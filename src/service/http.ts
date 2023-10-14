import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRequest = async <T>(endPoint: string) => {
  const storage = localStorage.getItem('591RentHelper');

  const token = storage ? JSON.parse(storage).token : null;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await instance.get<T>(endPoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async <T>(endPoint: string, body: any) => {
  const storage = localStorage.getItem('591RentHelper');

  const token = storage ? JSON.parse(storage).token : null;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await instance.post<T>(endPoint, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const putRequest = async <T>(endPoint: string, body: any) => {
  const storage = localStorage.getItem('591RentHelper');

  const token = storage ? JSON.parse(storage).token : null;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await instance.put<T>(endPoint, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (endPoint: string) => {
  const storage = localStorage.getItem('591RentHelper');

  const token = storage ? JSON.parse(storage).token : null;

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await instance.delete(endPoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
