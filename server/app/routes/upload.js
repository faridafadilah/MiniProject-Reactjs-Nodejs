const express = require("express");
const router = express.Router();

const {updateProfile} = require("../controllers/profile.controller");
const {uploadFile} = require("../middleware/upload-file");

router.patch('/updateProfile/:id', updateProfile);

module.exports = router;