/* 
서버에 로그인 상태를 물어보는 api 
*/
import axios from "axios";
import store from '@/store/index'

const BASE_URL = 'http://localhost:3000'

export const checkLoggedIn = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/api/auth/check`) // 서버에 로그인 정보를 물어봄
        if (response.data.loggedIn) { // 로그인 상태인 경우
            store.commit('setUser', response.data.user) // Vuex store의 사용자 정보를 업데이트함
        } else { // 로그인 상태가 아닌 경우
            store.commit('clearUser') // Vuex store의 사용자 정보를 초기화함
        }
    } catch (err) {
        console.error(err)
    }
}