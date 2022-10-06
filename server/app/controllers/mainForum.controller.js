const db = require("../models"); // Call Model
const mainForum = db.main; // Call Model User

// Controller For Create Main Forum
exports.create = (req, res) => {
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
}

// Controller For Find All Data Main Forum
exports.findAll = async(req, res) => {
  const forum = await mainForum.findAll();
  res.send(forum);
};

// Controller For Find One By Id Main Forum
exports.findOne = (req, res) => {
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
};

// Controller For Update Main Forum
exports.update = (req, res) => {
  const id = req.params.id;

  mainForum.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if(num == 1) {
        res.send({
          message: "Sub Forum was updated success!"
        });
      } else {
        res.send({
          message: `Cannot update with id = ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating with id ="+id
      });
    });
};

// Controller For Delete Main Forum
exports.delete = (req, res) => {
  const id = req.params.id;

  mainForum.destroy({
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