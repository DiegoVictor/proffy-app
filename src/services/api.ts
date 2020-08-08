import axios from 'axios';
// @ts-ignore
import { API_URL } from '@env';

export default axios.create({
  baseURL: API_URL,
});
