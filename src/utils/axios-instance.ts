import axios from 'axios';

export default axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/`,
  headers: {"Content-type": "application/json"}
});
