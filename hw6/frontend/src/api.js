import axios from 'axios';

/*const instance = axios.create({
  baseURL: http://localhost:4000/,
});*/

const API_PORT = process.env.NODE_ENV === "production" ? 
  "/" : "http://localhost:4000/";

const instance = axios.create({ baseURL: API_PORT });

export default instance;