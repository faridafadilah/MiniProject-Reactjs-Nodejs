const express = require("express"); // Framework Express
const router = express.Router(); // Router from Express
const db = require("../models"); // Call Model
const mainForum = db.main; // Call Model User

// Route to Create Main Forum
router.post("/create", (req, res) => {
  mainForum
    .findOne({
      where: {
        title: req.body.title,
      },
    })
    .then((main) => {
      if (main) {
        res.status(400).send({
          message: "Failed! Title is already in use!",
        });
      } else {
        // Create a New Main
        const newMain = {
          title: req.body.title,
        };

        // Save mainForum in the database
        mainForum
          .create(newMain)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the main forum.",
            });
          });
      }
    });
});

// Route to All Data Main Forum
router.get("/", async (req, res) => {
  const forum = await mainForum.findAll();
  res.send(forum);
});

// Route to Data By Id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  mainForum
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find mainForum with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving mainForum with id=" + id,
      });
    });
});

module.exports = router;
