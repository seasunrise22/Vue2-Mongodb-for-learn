<template>
    <PostForm :post=“post” :submitForm=“createPost” />
</template>

<script>
import PostForm from '…/components/PostForm.vue’

export default {
    components: {
        PostForm,
    },
    data() {
        return {
            post: {
                title: ‘’,
                content: ‘’,
                creator: ‘’,
            },
        }
    },
    methods: {
        async createPost() {
            try {
                const response = await fetch("http://localhost:5000/posts", {
                    method: ‘POST’,
                    headers: { ‘content- type’: ‘application / json’, }, body: JSON.stringify({ title: this.post.title, content: this.post.content, creator: this.post.creator, }), }) const json = await response.json() this.$router.push({ name: ‘Home’, })
    } catch(error) { console.log(error) }
}, }, } </script>

<style></style>