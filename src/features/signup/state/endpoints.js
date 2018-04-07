import axios from 'axios';

export const postSignup = (values) => {
    
    return axios.post(`/signup`, values, { withCredentials: false });

}