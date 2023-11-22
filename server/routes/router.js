import express from 'express'
import controller from '../controllers/controller.js'

const route = express.Router()

// API
route.get('/api/post', controller.getAllPost)
route.get('/api/post/:id', controller.getPost)
route.post('/api/post', controller.createPost)
route.put('/api/post/:id', controller.updatePost)
route.delete('/api/post/:id', controller.deletePost)
route.delete('/api/post/all', controller.deleteAllPost)

export default route