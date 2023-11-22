<template>
    <div>
        <DeleteConfirm v-if="id" :id="id" />
    </div>
</template>

<script>
import DeleteConfirm from '@/components/board/DeleteConfirm.vue';

export default {
    components: {
        DeleteConfirm
    },
    data() {
        return {
            id: this.$route.params.id
        }
    }
}

</script>