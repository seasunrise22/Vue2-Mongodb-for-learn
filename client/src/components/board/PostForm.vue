<template>
    <div class="postform-container">
        <b-form @submit.prevent="createPost">
            <div class="row">
                <div class="col-sm-6">
                    <b-form-input id="input-1" maxlength="4" v-model="post.author" type="text" placeholder="작성자"
                        class="mb-3 border-primary" required></b-form-input>
                </div>
                <div class="col-sm-6">
                    <b-form-input type="password" maxlength="4" id="input-2" v-model="post.password" placeholder="비밀번호"
                        class="border-primary" required></b-form-input>
                </div>
            </div>
            <b-form-input id="input-3" maxlength="50" v-model="post.title" placeholder="제목" class="mb-3 border-primary"
                required></b-form-input>
            <textarea maxlength="2000" name="" id="input-4" v-model="post.content" placeholder="  내용"
                class="mb-3 border-primary rounded" style="width: 100%; height: 200px;" required></textarea>

            <b-button type="submit" variant="primary" class="float-end">등록</b-button>
        </b-form>
    </div>
</template>
  
<script>
import apiBoard from '@/api/board.js'

export default {
    data() {
        return {
            post: {
                author: "",
                password: "",
                title: "",
                content: ""
            }
        }
    },
    methods: {
        async createPost() {
            if (confirm("등록하시겠습니까?")) {
                try {
                    await apiBoard.createPost(this.post)
                    this.$router.push({ name: 'BoardMain' })
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}
</script>

<style>
.postform-container {
    margin: 0 auto;
    padding: 20px;
    width: 50%;
}
</style>