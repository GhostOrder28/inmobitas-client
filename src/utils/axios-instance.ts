import axios from 'axios';

export default axios.create({
  baseURL: 'https://inmobitas-api.herokuapp.com/',
  headers: {"Content-type": "application/json"}
});
