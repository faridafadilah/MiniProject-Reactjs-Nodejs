const db = require("../models"); // Call Models Table
const config = require("../config/auth.config"); // Call auth config
const User = db.user; // Model User
const Role = db.role; // Model Role

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken"); // JWT for Authentication
var bcrypt = require("bcryptjs"); // Hash For Password

// Controller For Register
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Controller For Login 
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }) 
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// const { uploadFile }= require("../middleware/upload-file");

// router.patch("/update",uploadFile("image"), async(req, res) => {
//     try {
//         const id = req.params.id;
//         const newData = req.body

//         await User.update(newData, {
//             where: {
//                 id
//             }
//         });

//         const profile = JSON.parse(JSON.stringify(newData));
//         const newdata = profile[0];
//         res.send({
//             status: "success",
//             data: {
//                 newdata,
//                 image: "http://localhost:8080/uploads/" + newdata.image
//             }
//         });
//     } catch(e) {
//         console.log(e);
//         res.send({
//             status: 'failed',
//             message: 'Server Error'
//         })
//     }
// });


// module.exports = router;