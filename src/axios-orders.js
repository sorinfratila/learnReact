import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myburger-6eab1.firebaseio.com/',
});

export default instance;
