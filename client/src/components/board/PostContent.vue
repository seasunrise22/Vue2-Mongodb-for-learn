<template>
    <div class="card-container">
        <b-card :header="'작성자 ' + author" header-tag="header">
            <b-card-title>제목 {{ title }}</b-card-title>
            <b-card-text>{{ content }}</b-card-text>
            <template #footer>
                <div class="float-start">작성일 {{ createdAt }}</div>
                <div class="float-end">
                    <router-link :to="{ name: 'PostDelete', params: { id: id } }">
                        <b-button variant="danger" class="button-delete">삭제</b-button>
                    </router-link>
                    <b-button @click="onUpdate" variant="success">수정</b-button>
                </div>
            </template>
        </b-card>
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
        }
    },
    data() {
        return {
            title: null,
            author: null,
            password: null,
            content: null,
            createdAt: null
        }
    },
    methods: {
        async onUpdate() {
            this.$router.push({ name: "PostUpdate", params: { id: this.id } })
        }
    },
    mounted() {
        try {
            const id = this.id
            apiBoard.getOnePost(id).then((res) => {
                this.title = res.data.title
                this.author = res.data.author
                this.password = res.data.password
                this.content = res.data.content
                this.createdAt = moment(res.data.createdAt).format('YYYY/MM/DD HH:MM')
            })
        } catch (err) {
            console.error(err)
        }
    }
}
</script>
<style>
.card-container {
    margin: 0 auto;
    padding: 20px;
    width: 80%;
}

.card-footer {
    text-align: right;
}

.button-delete {
    margin-right: 0.5em;
}
</style>