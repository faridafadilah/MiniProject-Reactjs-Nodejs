// const express = require("express");
// const multer = require("multer");
// const uuidv4 = require('uuid');
// const router = express.Router();
// const db = require("../models"); // Call Model
// const User = db.user; // Call Model User

// const DIR = './public/';
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName);
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// router.put('/:id', upload.single('profileImg'), (req, res, next) => {
//     const id = req.params.id;
//     const url = req.protocol + '://' + req.get('host');
//     const newUser = {
//         username: req.body.username,
//         email: req.body.email,
//         image: url + '/public/' + req.file.filename
//     }
//     // Save mainForum in the database
//     User
//     .update(newUser,{
//         where: { id: id },
//     })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while creating the main forum.",
//       });
//     });
// });

// module.exports = router;