import axios from 'axios';
export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://inmobitas-api.herokuapp.com/' : `http://${process.env.REACT_APP_LOCALHOST_MOBILE}:3001/`,
  headers: {"Content-type": "application/json"}
});
