<template>
    <div class="board-container">
        <UpdateContent v-if="Object.keys(post).length > 0" :id="id" :post="post" />
    </div>
</template>
  
<script>
import UpdateContent from '@/components/board/UpdateContent.vue'
import apiBoard from '@/api/board.js'

export default {
    components: {
        UpdateContent
    },
    data() {
        return {
            id: this.$route.params.id,
            post: {}
        }
    },
    async mounted() {
        try {
            const result = await apiBoard.getOnePost(this.id)
            this.post = result.data
        } catch (err) {
            console.error(err)
        }
    }
}
</script>
<style>
.board-container {
    margin: 0 auto;
    width: 80%
}
</style>