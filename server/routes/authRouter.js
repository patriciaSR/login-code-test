var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  const { username, password } = req.body;

  const isRegisteredUser = username === 'hello@email.com' && password === 'hello1234';

  if(isRegisteredUser) {
    res.status(200).json({
      user: {
        email: username
      },
      token: 'xxxxxxx'
    })
  } else {
    res.status(401).json({
      message: 'Usuario o contraseña incorrectos'
    })
  }
});

module.exports = router;
