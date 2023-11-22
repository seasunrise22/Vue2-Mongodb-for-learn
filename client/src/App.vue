<!-- App.vue -->
<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { mapActions } from 'vuex';

export default {
  components: {
    NavBar
  },
  methods: {
    ...mapActions(['checkLoginState'])
  },
  created() {
    this.checkLoginState()
  }
}
</script>

<style></style>
