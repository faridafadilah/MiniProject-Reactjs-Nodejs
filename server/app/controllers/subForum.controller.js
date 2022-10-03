const express = require("express"); // Framework Express
const router = express.Router(); // Router from Express
const db = require("../models"); // Call Model
const subForum = db.sub; // Call Model User

// Route To Create Sub Forum
router.post("/create", (req, res) => {
  subForum
    .findOne({
      where: {
        judul: req.body.judul,
        mainforumId: req.body.mainforumId,
      },
    })
    .then((sub) => {
      if (sub) {
        res.status(400).send({
          message: "Failed! Name is already in use!",
        });
      } else {
        // Create a sub
        const newsub = {
          judul: req.body.judul,
          mainforumId: req.body.mainforumId,
        };

        // Save subForum in the database
        subForum
          .create(newsub)
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

// Route To All Sub Forum
router.get("/", (req, res) => {
  subForum
    .findAll({
      where: {
        mainforumId: req.query.mainforumId,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find subForum with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving subForum with id=" + id,
      });
    });
});

// Route Data By Id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  subForum
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find subForum with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving subForum with id=" + id,
      });
    });
});

module.exports = router;
