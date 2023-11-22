import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BoardMain from '../views/board/Main.vue'
import PostCreate from '@/views/board/Create.vue'
import PostContent from '@/views/board/Content'
import PostUpdate from '@/views/board/Update'
import PostDelete from '@/views/board/Delete'
import UserLogin from '@/views/user/Login'
import UserRegister from '@/views/user/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // Board Routes
  {
    path: '/board',
    name: 'BoardMain',
    component: BoardMain,
  },
  {
    path: '/board/create',
    name: 'PostCreate',
    component: PostCreate
  },
  {
    path: '/board/content/:id',
    name: 'PostContent',
    component: PostContent
  },
  {
    path: '/board/update/:id',
    name: 'PostUpdate',
    component: PostUpdate
  },
  {
    path: '/board/delete/:id',
    name: 'PostDelete',
    component: PostDelete
  },
  // User Routes
  {
    path: '/user/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: UserRegister
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
