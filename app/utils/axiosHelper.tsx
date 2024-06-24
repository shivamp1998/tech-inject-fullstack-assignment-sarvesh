import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const axiosGet = async (url: string, headers: any = {}) => {
  return axiosInstance.get(url, { headers });
};

export const axiosPost = async (url: string, headers: any = {}, body: any) => {
  return axiosInstance.post(url, body, { headers });
};

export const axiosDelete = async (url: string, headers: any = {}) => {
  return axiosInstance.delete(url, { headers });
};

export const axiosPatch = async(url: string, headers: any ={}, body: any) => {
  return axiosInstance.patch(url,body,{headers})
}
