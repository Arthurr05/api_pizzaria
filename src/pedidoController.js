const db = require('./db');
 
exports.listarPedidos = (req, res) => {
    db.query('SELECT * FROM pedido', (err, result) => {
        if (err) {
            console.log('Erro ao buscar Produtos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};
 
exports.buscarPedidos = (req, res) => {
    const { id_pedido } = req.params;
    db.query('SELECT * FROM pedido WHERE id_pedido= ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao buscar Pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Pedido não encontrado' });
            return;
        }
        res.json(result[0])
    });
};
 
exports.adicionarPedido = (req, res) => {
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body
 
    const novoPedido = {
       forma_pgto,
       qtde_itens,
       valor_total,
       observacao,
       id_cliente,
       id_entregador
    };
    db.query('INSERT INTO produto SET ?', novoPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar Pedido', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Pedido feito com sucesso' });
    });
}
 
exports.atualizarPedido = (req, res) => {
    const { id } = req.params;
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body;
   
    const pedidoAtualizado = {
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    };
    db.query('UPDATE pedido SET ? WHERE id_pedido = ?',
        [pedidoAtualizado, id], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar pedido:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Pedido atualizado com sucesso' });
        });
}
 
exports.deletarPedido= (req, res) => {
    const { id_pedido } = req.params
    db.query('DELETE FROM produto WHERE id_pedido=? ', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pedido deletado com sucesso' });
    });
};