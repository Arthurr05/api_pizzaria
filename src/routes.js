const express = require('express');
const path = require('path');
const router = express.Router()
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
const clienteController = require('./clienteController');
const loginController = require('./logincontroller');
const produtoController = require('./produtoController')
const pedidoController = require('./pedidoController')
const itemPedidoController = require('./itemPedidoController')
// CLIENTE
router.get('./clientes', loginController.autenticarToken, clienteController.listarClientes);
router.get('./clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente)
router.get('/clientes', clienteController.adicionarCliente);
router.patch('/clientes/:cpf', loginController.autenticarToken, clienteController.atualizarCliente);
router.delete('/clientes/:cpf', loginController.autenticarToken, clienteController.deletarCliente);
router.post('./login', loginController.loginCliente);

//PRODUTO
router.get('./produtos', produtoController.listarProdutos);
router.get('./produtos/id_produto', produtoController.buscarProdutoId);
router.get('./produtos/nome/:nome', produtoController.buscarProdutoNome);
router.patch('/produtos/id_produto', loginController.autenticarToken, produtoController.atualizarProduto);
router.delete('/produtos/id_produto', loginController.autenticarToken, produtoController.deletarProduto);
router.post('./produtos', loginController.autenticarToken, produtoController.adicionarProduto);

//Pedido
router.get('/pedido',pedidoController.listarPedidos)
router.get('/pedido/:id_pedido',pedidoController.buscarPedidos)
router.post('/pedido',pedidoController.adicionarPedido)
router.patch('/pedido',pedidoController.atualizarPedido)
router.delete('/pedido/:id',pedidoController.deletarPedido)

//Rotas para item pedido
router.get('/item_pedido',itemPedidoController.listarItens)
router.get('/item_pedido/:id_item',itemPedidoController.buscarItens)
router.post('/item_pedido',itemPedidoController.adicionarItem)
router.patch('/item_pedido',itemPedidoController.atualizarItem)
router.delete('/item_pedido/:id_item',itemPedidoController.deletarItem)

module.exports = router;
