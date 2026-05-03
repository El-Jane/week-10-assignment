const express = require("express");

const router = express.Router();
const multer = require('multer');
const {registerUser, loginUser} = require('../controllers/user.controller');

router.post('/sign-up', registerUser);

router.post('/login', loginUser);

const upload = multer({dest: 'uploads/' }); //Auto creates folder

router.post('/upload', upload.single("picture"), (req, res) => {
  console.log('body', req.body);
  console.log('file', req.file);
  res.send('Upload successful');
});


module.exports = router
