import axios, { AxiosResponse} from 'axios';
const baseURL: string | undefined = process.env.BASE_URL;


export const axiosGet = async (url: string, headers: any) => {
    return axios.get(baseURL + url, {headers})
}

export const axiosPost = async (url: string, headers: any, body: any) => {
    return axios.post(baseURL + url, body, {headers})
}


