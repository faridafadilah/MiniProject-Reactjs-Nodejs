const express = require("express"); // Framework Express
const router = express.Router(); // Router from Express
const db = require("../models"); // Call Model
const Thread = db.thread; // Call Model User

// Route Create Thread
router.post("/create", (req, res) => {
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
});

// Route All Data Thread By Id Sub Forum
router.get("/", (req, res) => {
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
});

// Route Thread By Id
router.get("/:id", (req, res) => {
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
});

module.exports = router;
