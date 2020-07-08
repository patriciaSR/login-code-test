var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const isRegisteredUser = username === 'hello@email.com' && password === 'hello1234';

  if (isRegisteredUser) {
    res.status(200).json({
      user: {
        email: username
      },
      token: 'xxxxxxx'
    });
  } else {
    res.status(401).json({
      message: 'Usuario o contraseña incorrectos'
    });
  }
});

router.delete('/:token?', (req, res) => {
  if (req.params && req.params.token) {
    res.send(200);
  } else {
    res.send(400);
  }
});

module.exports = router;
