<template>
    <div id="loginForm-container">
        <b-form @submit="onSubmit">
            <b-form-input id="input-id" class="border-info" v-model="form.id" type="text" placeholder="아이디"
                required></b-form-input>
            <b-form-input id="input-password" class="border-info" v-model="form.password" type="password" placeholder="비밀번호"
                required></b-form-input>

            <b-form-group id="checkbox-group">
                <b-form-checkbox id="checkbox-remember" v-model="form.rememberId" name="checkbox-1" value="accepted"
                    unchecked-value="not_accepted">
                    아이디 기억
                </b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary" id="button-login">로그인</b-button>
        </b-form>
    </div>
</template>
  
<script>
import apiUser from '@/api/user'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            form: {
                id: '',
                password: '',
                rememberId: 'not_accepted'
            },
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        onSubmit(event) {
            event.preventDefault()
            apiUser.userLogin(this.form)
                .then(response => {
                    if (response.data.message) {
                        console.log(response.data.message)
                    }
                    this.setUser(response.data.user) // Vuex store에 유저 정보 저장
                    this.$router.push('/')
                })
                .catch(error => {
                    if (error.response) {
                        console.error(error.response.data.message)
                    }
                    else {
                        console.error("네트워크 오류")
                    }
                })
        }
    }
}
</script>

<style>
#loginForm-container {
    margin: 15% auto;
    width: 20%;
}

#input-id {
    margin-bottom: 1em;
}

#checkbox-group {
    float: right;
    margin-top: 0.5em;
}

#button-login {
    width: 100%;
    margin-top: 1em;
}

#checkbox-remember {
    margin-right: 0.5em;
}
</style>