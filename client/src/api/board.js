import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default {
    getAllPost() {
        return axios.get(BASE_URL + '/api/post')
    },
    getOnePost(id) {
        return axios.get(BASE_URL + `/api/post/${id}`)
    },
    createPost(post) {
        return axios.post(BASE_URL + '/api/post', post)
    },
    updatePost(id, updatedPost) {
        return axios.put(BASE_URL + `/api/post/${id}`, updatedPost)
    },
    deletePost(id) {
        return axios.delete(BASE_URL + `/api/post/${id}`)
    },
    deleteAllPost() {
        return axios.delete(BASE_URL + '/api/post/all')
    }
}