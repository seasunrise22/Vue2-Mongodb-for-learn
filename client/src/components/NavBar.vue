<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" style="margin-left: 1.5em">
        <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
          width="50" height="50">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav>
          <b-nav-item to="/">홈</b-nav-item>
          <b-nav-item to="/board">게시판</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto" style="margin-right: 1.5em;">
          <!-- 로그인 o -->
          <template v-if="isLoggedIn">
            <b-badge id='userInfo'>
              {{ user ? user.id : '' }} 님 환영합니다!
            </b-badge>
            <b-button variant="warning" @click="handleLogout">로그아웃</b-button>
          </template>
          <!-- 로그인 x -->
          <template v-else>
            <router-link :to="{ name: 'UserLogin' }">
              <b-button variant="success">로그인</b-button>
            </router-link>
            <router-link :to="{ name: 'UserRegister' }">
              <b-button variant="success" style="margin-left: 1em;">회원가입</b-button>
            </router-link>
          </template>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState(['user', 'isLoggedIn'])
  },
  methods: {
    async handleLogout() {
      const response = await axios.post('http://localhost:3000/user/api/auth/logout')
      if (response) {
        window.location.reload()
      }
    }
  }
}

</script>

<style>
#userInfo {
  background-color: aliceblue;
  color: black;
  margin-right: 1em;
  display: flex;
  align-items: center;
}
</style>