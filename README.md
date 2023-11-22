# CRUD Learning project (vue2, express, mongodb)
- 개발인원 : 1명
- 역할
  - 전체
## Introduction
이 프로젝트는 CRUD 기능을 구현한 웹앱입니다.

사용자는 게시글을 작성하고, 수정하고, 삭제할 수 있습니다.

또한 로그인과 로그아웃 기능도 제공됩니다.

프로젝트는 크게 Client-side와 Server-side로 나뉘어져 있습니다.
## Development Environment
- Code editor : Visual Studio Code
- Language : JavaScript
- Client-side : Vue.js(Vue2), Bootstrap-vue
- Back-end : express, mongodb
## Screenshots
##### 전체화면
![1_full](https://user-images.githubusercontent.com/45503931/234842339-9e805182-52d2-438c-bf23-ac6260a0a4ad.PNG)
##### 페이지네이션
![pagi](https://user-images.githubusercontent.com/45503931/234842368-444a3a7a-9dc2-47b6-804a-b35dc128c139.PNG)
##### 글작성(CREATE)
![2_write](https://user-images.githubusercontent.com/45503931/234842342-57c973a9-b635-4b9b-9122-a65714e00366.PNG)
![2_write-list](https://user-images.githubusercontent.com/45503931/234842343-ae702191-5e8e-4dbd-9c95-51ea7d527f10.PNG)
##### 작성글 확인(READ)
![write_post](https://user-images.githubusercontent.com/45503931/234842386-a1d635f9-a29a-442a-81cf-4345e91c536c.PNG)
##### 글수정(UPDATE)
![update](https://user-images.githubusercontent.com/45503931/234842380-ac7320fc-be3d-41de-ad49-1ed56b717347.PNG)
![update-after](https://user-images.githubusercontent.com/45503931/234842383-5391e75c-0c3d-4303-8a99-e203ddd3c94f.PNG)
![update-post](https://user-images.githubusercontent.com/45503931/234842385-7a8724ec-b410-4c64-9cdd-23a6653b7b96.PNG)
##### 글삭제(DELETE)
![delete](https://user-images.githubusercontent.com/45503931/234842346-39699e5e-c9d9-48ff-92ce-28ae3acb3e08.PNG)
![delete-after](https://user-images.githubusercontent.com/45503931/234842349-f145c5b5-34bd-4070-b4e7-b12e2f93c56a.PNG)
##### 회원가입
![regi](https://user-images.githubusercontent.com/45503931/234842377-951ee44f-ae02-45cf-9187-6be6799bb49b.PNG)
##### 로그인
![login](https://user-images.githubusercontent.com/45503931/234842354-5631f97d-94ce-4577-ab65-711fc8711cde.PNG)
##### 로그인-성공(부분)
![login-after](https://user-images.githubusercontent.com/45503931/234842357-8451a37a-0298-4d5c-aced-c1b65e1e6c23.PNG)
##### 로그인-성공(전체)
![login-full](https://user-images.githubusercontent.com/45503931/234842362-72ba7fa2-ff44-4912-8f75-fba8c593b52d.PNG)
## Code Preview
### Server-side
##### express 서버 구동과 동시에 mongoose를 통한 mongodb 연결
```javascript
// server/config/db.js
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,)
        console.log('MongoDB connected')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

// server.js
const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  connectDB()
    .then(console.log(`Server is running http://localhost:${process.env.PORT}`))
    .catch((err) => console.log(err));
});
```
##### 클라이언트측의 요청은 router로 걸러서 각 기능을 구현해 둔 controller로 연결
```javascript
// 게시판
route.get('/api/post', controller.getAllPost)
route.get('/api/post/:id', controller.getPost)
route.post('/api/post', controller.createPost)
route.put('/api/post/:id', controller.updatePost)
route.delete('/api/post/:id', controller.deletePost)
route.delete('/api/post/all', controller.deleteAllPost)

// 유저
userRoute.post('/api/login', userController.login) // 로그인
userRoute.post('/api/register', userController.register) // 회원가입
userRoute.get('/api/auth/check', userController.checkLoggedIn) // 로그인 여부 확인
userRoute.post('/api/auth/logout', userController.logout) // 로그아웃 로직
```
##### 라우터로부터 연결 된 컨트롤러에서 클라이언트가 요청한 기능을 비동기적으로 수행.
* Create 
```javascript
const createPost = async (req, res) => {
  try {
    const post = req.body
    const createdPost = await BoardSchema.create(post)
    res.status(201).json(createdPost)
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
    console.error(err)
  }
}
```
* Read 
```javascript
const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await BoardSchema.findById(id)
    res.json(post)
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
    console.error(err)
  }
}
```
* Update 
```javascript
const updatePost = async (req, res) => {
  try {
    const id = req.params.id
    const updatedPost = req.body
    const result = await BoardSchema.findByIdAndUpdate(id, updatedPost, { new: true })
    res.json(result)
  } catch (err) {
    console.error(err)
  }
}
```
* Delete 
```javascript
const deletePost = async (req, res) => {
  const id = req.params.id
  try {
    const data = await BoardSchema.findByIdAndDelete(id)
    if (!data) {
      res.status(404).send({ message: 'Could not delete post. Maybe id is wrong' })
    } else {
      res.send({ message: 'One post deleted' })
    }
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
    console.error(err)
  }
}
```
##### passport 미들웨어를 이용하여 로그인 기능 구현
```javascript
// 로그인 로직
  login: async (req, res, next) => {
    try {
      // 인증 미들웨어 생성
      const authenticate = passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.status(401).json({ message: info.message })
        }
        req.logIn(user, (err) => { // 로그인 시도
          if (err) {
            return next(err)
          }
          if (req.isAuthenticated()) { // 로그인 성공
            return res.status(200).json({ message: '로그인에 성공하였습니다.', user })
          } else {
            return res.status(400).json({ message: '로그인에 실패하였습니다.' })
          }
        })
      })

      authenticate(req, res, next)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
```
### Client-side
##### Vue 프레임워크의 기본 페이지가 되는 App.vue 파일에 최상단에 위치할 Navbar.vue 컴포넌트와 router-view 를 배치
```vue
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
```
##### 라우터를 통해 페이지를 전환
```javascript
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
```
##### 각 view의 하위 컴포넌트에서 페이지를 렌더링
```javascript
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
```
##### 클라이언트는 서버로 api 요청을 보내 res 객체를 받아 필요한 로직을 수행(게시판 목록 불러오는 예시)
```javascript
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
                        if (now.isSame(createdAt, 'day')) formattedTime = createdAt.format('HH:mm')
                        else if (now.isSame(createdAt, 'year')) formattedTime = createdAt.format('MM.DD')
                        else formattedTime = createdAt.format('YY.MM.DD')
                        post.createdAt = formattedTime

                        // items 배열에 가공 된 post 넣기
                        this.items.unshift(post)
                        i++
                    }
                    this.postCount = Object.keys(resData).length
                })
        } catch (err) {
            console.error(err)
        }
    }
  ```
