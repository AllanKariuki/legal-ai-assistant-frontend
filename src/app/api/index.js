import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})
export const get = async (url) => {
    const response = await axiosInstance.get(url);
    return response.data;
}

export const post = async (url, data) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
}