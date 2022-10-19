const db = require('../models') // Call Model
const Post = db.post // Call Model User

// Controller For Create Post
exports.create = async (req, res) => {
  // Create a New Post
  const newPost = {
    content: req.body.content,
    threadId: req.body.threadId,
    userId: req.body.userId,
    nameUser: req.body.nameUser,
    imageUser: req.body.imageUser,
  }

  // Save Post in the database
  Post.create(newPost)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the sub forum.',
      })
    })
}

// Controller For Find All Data Post
exports.findAll = async (req, res) => {
  const page = req.query.page
  const perPage = 10

  const posts = await Post.findAll({
    where: {
      threadId: req.query.threadId,
    },
    limit: perPage,
    offset: perPage * (page - 1),
  })
  res.send(posts)
}

// Controller For Delete Post
exports.delete = (req, res) => {
  const id = req.params.id
  // Delete Comment By Id
  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Main Forum was deleted success!',
        })
      } else {
        res.send({
          message: 'Cannot delete with id' + id,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Main Forum with id' + id,
      })
    })
}
