import axios from 'axios';

export const axiosRequest = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
