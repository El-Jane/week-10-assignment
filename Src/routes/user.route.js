const express = require("express");

const router = express.Router();
const multer = require('multer');
const {registerUser, loginUser} = require('../controllers/user.controller');

router.post('/sign-up', registerUser);

router.post('/login', loginUser);

const upload = multer({dest: 'uploads/' }); //Auto creates folder

router.post('/picture', upload.single("picture"), (req, res) => {
  console.log('file', req.file);
  console.log('body', req.body);
  res.send('Upload successful');
});


module.exports = router
