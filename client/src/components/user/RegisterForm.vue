<template>
    <div id="registerForm-container">
        <b-form @submit="onSubmit">
            <b-form-input id="input-username" class="border-info" v-model="form.id" type="text" placeholder="아이디"
                required></b-form-input>
            <b-form-input id="input-password" class="border-info" v-model="form.password" type="password" placeholder="비밀번호"
                required></b-form-input>
            <b-form-input id="input-password" class="border-info" v-model="form.passwordConfirm" type="password"
                placeholder="비밀번호 확인" required></b-form-input>

            <b-button type="submit" variant="primary" id="button-register">회원가입</b-button>
        </b-form>
    </div>
</template>
  
<script>
import apiUser from '@/api/user'

export default {
    data() {
        return {
            form: {
                id: '',
                password: '',
                passwordConfirm: ''
            },
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault()
            // id check
            if (this.form.id.length < 4 || this.form.id.length > 8) {
                alert('아이디는 4글자 이상, 8글자 이하여야 합니다.')
                return
            }
            if (!/[0-9]/.test(this.form.id)) {
                alert('아이디에는 최소 하나 이상의 숫자가 필요합니다.')
                return
            }
            if (!/[a-zA-Z]/.test(this.form.id)) {
                alert('아이디에는 최소 하나 이상의 영문자가 필요합니다.')
                return
            }
            if (!/^[a-zA-Z0-9]*$/.test(this.form.id)) {
                alert('아이디는 영문자와 숫자만 사용할 수 있습니다.')
                return
            }

            // password check
            if (this.form.password === this.form.passwordConfirm) {
                try {
                    if (this.form.password.length < 4 || this.form.password.length > 8) {
                        alert('비밀번호는 4자리 이상 8자리 이하여야 합니다.')
                        return
                    }
                    const response = await apiUser.userRegister(this.form)
                    if (response.status === 200) {
                        alert('회원가입 성공')
                    } else {
                        alert('회원가입 실패')
                    }
                } catch (err) {
                    if (err.response && err.response.status === 400) {
                        const data = err.response.data
                        alert(data.msg)
                    } else {
                        console.error(err.response.data)
                    }
                }
            } else {
                alert("비밀번호가 일치하지 않습니다.")
            }
        },
    }
}
</script>

<style>
#registerForm-container {
    margin: 15% auto;
    width: 20%;
}

#input-password {
    margin-top: 1em;
}

#checkbox-group {
    float: right;
    margin-top: 0.5em;
}

#button-register {
    width: 100%;
    margin-top: 3em;
}
</style>