<template>
    <div class="updatecontent-container">
        <b-form @submit.prevent="updatePost">
            <div class="row">
                <div class="col-sm-6">
                    <b-form-input id="input-1" maxlength="4" v-model="updatedPost.author" type="text" placeholder="작성자"
                        class="mb-3 border-primary" required></b-form-input>
                </div>
                <div class="col-sm-6">
                    <b-form-input type="password" maxlength="4" id="input-2" v-model="password" placeholder="비밀번호"
                        class="border-primary" required></b-form-input>
                </div>
            </div>
            <b-form-input id="input-3" maxlength="50" v-model="updatedPost.title" placeholder="제목"
                class="mb-3 border-primary" required></b-form-input>
            <textarea maxlength="2000" name="" id="input-4" v-model="updatedPost.content" placeholder="  내용"
                class="mb-3 border-primary rounded" style="width: 100%; height: 200px;" required></textarea>

            <b-button type="submit" variant="success" class="float-end">수정</b-button>
        </b-form>
    </div>
</template>
<script>
import apiBoard from '@/api/board.js'
import moment from 'moment'
moment.locale('ko')

export default {
    props: {
        id: {
            type: String,
            required: true
        },
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            updatedPost: this.post, // props로 받은 데이터 직접 수정 권장하지 않는대서 복사해서 사용
            password: null
        }
    },
    methods: {
        async updatePost() {
            if (confirm("수정하시겠습니까?")) {
                try {
                    if (this.updatedPost.password === this.password) {
                        await apiBoard.updatePost(this.id, this.updatedPost)
                        this.$router.push({ name: "BoardMain" })
                    } else {
                        alert("비밀번호가 일치하지 않습니다.")
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}
</script>

<style>
.updatecontent-container {
    margin: 0 auto;
    padding: 20px;
    width: 50%;
}
</style>