import axios from 'axios';

export const postLogin = (values) => {
    
    return axios.post(`/login`, values, { withCredentials: false });

}