import axios from 'axios';

export const axiosGet = async (url: string, headers: any = {}) => {
    return axios.get(`${url}`, {headers})
}

export const axiosPost = async (url: string, headers: any = {}, body: any) => {
    return axios.post(`${url}`, body, {headers})
}


