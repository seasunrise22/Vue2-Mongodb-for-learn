/* client/src/store/index.js */
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 상태 값
    state: {
        user: null, // 로그인한 사용자 정보를 저장할 객체
        isLoggedIn: false // 로그인 여부를 나타내는 변수
    },
    // 뮤테이션
    mutations: {
        setUser(state, user) { // 로그인 시 사용자 정보를 저장하는 함수
            state.user = user
            state.isLoggedIn = true
        },
        clearUser(state) {
            state.user = null
            state.isLoggedIn = false
        }
    },
    // 액션
    actions: {
        async checkLoginState({ commit }) { // 로그인 상태를 체크하는 액션
            try {
                const response = await axios.get('http://localhost:3000/user/api/auth/check') // 서버에 로그인 상태를 체크하는 API 요청

                if (response.data) {
                    console.log('User LoggedIn')
                    commit('setUser', response.data.user) // 로그인 상태 갱신
                }
            } catch (err) {
                if (err.response && err.response.status === 401) { // 401 Unauthorized
                    console.log('User Not LoggedIn')
                    commit('clearUser') // 사용자 정보를 초기화
                } else {
                    console.error(err)
                }
            }
        }
    }
})

export default store