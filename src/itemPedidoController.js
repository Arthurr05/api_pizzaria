const db = require('./db');
 
exports.listarItens = (req, res) => {
    db.query('SELECT * FROM item_pedido', (err, result) => {
        if (err) {
            console.log('Erro ao buscar Produtos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};
 
exports.buscarItens = (req, res) => {
    const {id_item } = req.params;
    db.query('SELECT * FROM item_pedido WHERE id_item= ?',id_item , (err, result) => {
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
 
exports.adicionarItem= (req, res) => {
    const {qtde, valor_parcial,id_produto,id_pedido} = req.body
   
    const novoItem = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    };
    db.query('INSERT INTO item_pedido SET ?', novoItem, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar Item', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Item adicionado com sucesso' });
    });
}
 
exports.atualizarItem = (req, res) => {
    const { id } = req.params;
    const {qtde, valor_parcial, id_produto, id_pedido } = req.body;
   
    const itemPedidoAtualizado = {
        qtde,
        valor_parcial,
        id_pedido,
        id_produto        
    };
    db.query('UPDATE item_pedido SET ? WHERE id_item = ?',
        [itemPedidoAtualizado, id], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar item:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Item atualizado com sucesso' });
        });
}
 
exports.deletarItem= (req, res) => {
    const { id_item} = req.params
    db.query('DELETE FROM produto WHERE id_item=? ', id_item, (err, result) => {
        if (err) {
            console.error('Erro ao deletar item:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'item deletado com sucesso' });
    });
};