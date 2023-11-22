<template>
    <div class="deleteconfirm-container">
        <b-form @submit.prevent="confirm">
            <b-form-input id="passwordInput" type="password" maxlength="4" v-model="password" placeholder="비밀번호를 입력하세요."
                class="mb-3 border-primary" required></b-form-input>

            <b-button type="submit" variant="danger" class="float-end">삭제</b-button>
            <b-button class="button-delete float-end" @click="cancel">취소</b-button>
        </b-form>
    </div>
</template>

<script>
import apiBoard from '@/api/board.js'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            password: null
        }
    },
    methods: {
        async confirm() {
            try {
                if (confirm("삭제하시겠습니까?")) {
                    const post = await apiBoard.getOnePost(this.id)
                    if (post.data.password === this.password) {
                        await apiBoard.deletePost(this.id)
                        alert('삭제되었습니다.')
                        this.$router.push({ name: 'BoardMain' })
                    } else {
                        alert('비밀번호가 다릅니다.')
                    }
                }
            } catch (err) {
                console.error(err)
            }
        },
        cancel() {
            this.$router.go(-1)
        }
    }
}
</script>

<style>
.deleteconfirm-container {
    margin: 10% auto;
    width: 20%
}

.button-delete {
    margin-right: 0.5em;
}
</style>