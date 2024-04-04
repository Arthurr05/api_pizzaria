const express = require('express');
const path = require('path');
const router = express.Router()
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
const clienteController = require('./clienteController');

router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:cpf',clienteController.buscarCliente);
router.post('/clientes/:cpf', clienteController.atualizarCliente);
router.delete('/clientes/:cpf', clienteController.deletarCliente);
module.exports = router;