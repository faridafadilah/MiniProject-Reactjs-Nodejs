const db = require("../models"); // Call Model
const Thread = db.thread; // Call Model User

// Controller For Create Thread
exports.create = (req, res) => {
  Thread.findOne({
    where: {
      title: req.body.title,
      subforumId: req.body.subforumId,
    },
  }).then((sub) => {
    if (sub) {
      res.status(400).send({
        message: "Failed! Name is already in use!",
      });
    } else {
      // Create a new thread
      const newsub = {
        title: req.body.title,
        subforumId: req.body.subforumId,
        content: req.body.content,
        userId: req.body.userId,
      };

      // Save Thread in the database
      Thread.create(newsub)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the sub forum.",
          });
        });
    }
  });
};

// Controller For Find All Thread
exports.findAll = (req, res) => {
  Thread.findAll({
    where: {
      subforumId: req.query.subforumId,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Thread with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Thread with id=" + id,
      });
    });
};

// Controller For Find One Thread By ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Thread.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Thread with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Thread with id=" + id,
      });
    });
};

// Controller For Delete Thread
exports.delete = (req, res) => {
  const id = req.params.id;

  Thread.destroy({
    where: { id: id }
  })
    .then(num => {
      if(num == 1) {
        res.send({
          message: "Main Forum was deleted success!"
        });
      } else {
        res.send({
          message: 'Cannot delete with id' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Main Forum with id" + id
      });
    });
};