<template>
    <b-container class="container">
        <b-row>
            <b-table striped hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage"
                @row-clicked="rowClickHandler" id="postlist" class="text-center">
            </b-table>
        </b-row>

        <div class="button-container">
            <router-link to="/board/create">
                <b-button variant="primary">글쓰기</b-button>
            </router-link>
        </div>

        <div class="pagination overflow-auto">
            <b-pagination v-model="currentPage" :total-rows="postCount" :per-page="perPage"
                aria-controls="postlist"></b-pagination>
        </div>
    </b-container>
</template>
  
<script>
import apiBoard from '@/api/board.js'
import moment from 'moment'
moment.locale('ko')

export default {
    data() {
        return {
            // pagination
            perPage: 10,
            currentPage: 1,
            postCount: null,

            // show post
            items: [],
            fields: [
                { label: '번호', key: 'index', thStyle: { width: "10%" }, },
                { label: '제목', key: 'title', thStyle: { width: "50%" }, },
                { label: '작성자', key: 'author', thStyle: { width: "20%" }, },
                { label: '작성일', key: 'createdAt', thStyle: { width: "20%" }, }
            ],
        }
    },
    methods: {
        rowClickHandler(item) {
            this.$router.push({ path: `/board/content/${item._id}` })
        }
    },
    mounted() {
        try {
            apiBoard.getAllPost()
                .then((res) => {
                    let i = 0
                    const now = moment() // 현재 날짜와 시간(한국)
                    const resData = res.data
                    for (let post of resData) {
                        // delete post._id
                        delete post.__v

                        // 작성일 형식 변환
                        const createdAt = moment(post.createdAt)
                        let formattedTime
                        if (now.isSame(createdAt, 'day')) formattedTime = createdAt.format('HH:mm') // 오늘 작성된 경우
                        else if (now.isSame(createdAt, 'year')) formattedTime = createdAt.format('MM.DD') // 올해 작성된 경우
                        else formattedTime = createdAt.format('YY.MM.DD') // 그 외 작성된 경우
                        post.createdAt = formattedTime

                        // items 배열에 가공 된 post 넣기
                        this.items.unshift(post) // 배열의 시작 부분에 추가
                        i++
                    }
                    this.postCount = Object.keys(resData).length
                })
        } catch (err) {
            console.error(err)
        }
    }
}
</script>
<style>
.container {
    padding: 20px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
}

.pagination {
    margin: 0 auto
}
</style>