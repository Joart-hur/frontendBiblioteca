const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/aluno',alunoController.buscarTodos)