const db = require("../models"); // Call Model
const subForum = db.sub; // Call Model User

// Controller For Create Sub Forum
exports.create = (req, res) => {
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
};

// Controller For Find All Data Sub Forum
exports.findAll = (req, res) => {
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
};

// Controller For Find One By Id Sub Forum
exports.findOne = (req, res) => {
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
};

// Controller For Update Sub Forum
exports.update = (req, res) => {
  const id = req.params.id;

  subForum.update(req.body, {
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

// Controller For Delete Sub Forum
exports.delete = (req, res) => {
  const id = req.params.id;

  subForum.destroy({
    where: { id: id }
  })
    .then(num => {
      if(num == 1) {
        res.send({
          message: "Sub Forum was deleted success!"
        });
      } else {
        res.send({
          message: 'Cannot delete with id' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sub Forum with id" + id
      });
    });
};