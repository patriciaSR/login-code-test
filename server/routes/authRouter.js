var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const isRegisteredUser = email === 'hello@email.com' && password === 'hello1234';

  if (isRegisteredUser) {
    res.status(200).json({
      user: {
        email
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
