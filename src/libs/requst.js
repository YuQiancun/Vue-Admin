import HttpRequest from '@/libs/axios.js'
import baseUrl from './config'
const axios = {
    httpAREA: new HttpRequest(baseUrl.baseUrl.devAREA)
};
export default axios