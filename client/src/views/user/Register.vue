<template>
    <div class="register-container">
        <RegisterForm />
    </div>
</template>
  
<script>
import RegisterForm from '@/components/user/RegisterForm.vue'

export default {
    components: {
        RegisterForm
    }
}
</script>
<style>
.register-container {
    margin: 0 auto;
    width: 80%
}
</style>