import BoardSchema from "../models/board/board.js";

const getAllPost = async (req, res) => {
  try {
    const allPost = await BoardSchema.find() // typeof(allPosts) = object        
    res.json(allPost)
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
    console.error(err)
  }
}

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

const deleteAllPost = async (req, res) => {
  try {
    const result = await BoardSchema.deleteMany({})
    res.json({ message: `All post deleted: ${result.deletedCount}` })
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
    console.error(err)
  }
}

export default {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteAllPost
}