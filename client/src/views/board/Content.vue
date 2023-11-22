<template>
    <div class="board-container">
        <PostContent :id="$route.params.id" />
    </div>
</template>
  
<script>
import PostContent from '@/components/board/PostContent.vue'

export default {
    components: {
        PostContent
    }
}
</script>
<style>
.board-container {
    margin: 0 auto;
    width: 80%
}
</style>