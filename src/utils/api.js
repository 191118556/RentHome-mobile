
//引入axios
import axios from 'axios'
//引入根据环境改变的基准url
import { BASE_URL } from './url'
//创建axios实例，并配置
const instance = axios.create({
    baseURL: BASE_URL,//配置基准路径
    timeout: 5000
})
export default instance
