<template>
  <div class="board-container">
    <PostList />
  </div>
</template>

<script>
import PostList from '@/components/board/PostList.vue'

export default {
  components: {
    PostList
  }
}
</script>
<style>
.board-container {
  margin: 0 auto;
  width: 80%
}
</style>