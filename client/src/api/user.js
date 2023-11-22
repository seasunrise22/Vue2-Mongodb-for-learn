import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default {
    userRegister(userData) {
        return axios.post(BASE_URL + '/user/api/register', userData)
    },
    userLogin(userData) {
        return axios.post(BASE_URL + '/user/api/login', userData)
    }
}