<template>
    <div class="login-container">
        <LoginForm />
    </div>
</template>
  
<script>
import LoginForm from '@/components/user/LoginForm.vue'

export default {
    components: {
        LoginForm
    }
}
</script>
<style>
.login-container {
    margin: 0 auto;
    width: 80%
}
</style>