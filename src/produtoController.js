const db = require('./db');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const produtoSchema = Joi.object({
    id_produto: Joi.string().required,
    nome_produto: Joi.string().required,
    descricao: Joi.string().required,
    valor_unitario: Joi.string().required,
    imagem: Joi.string().required,
});

exports.listarProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};

exports.buscarProdutoId = (req, res) => {
    const {id_produto} = req.params
    db.query('SELECT * FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result[0]);
    })
}

exports.buscarProdutoNome = (req, res) => {
    const { nome } = req.params; 
    db.query('SELECT * FROM produto WHERE nome_produto LIKE ?', [`${nome}`], (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result);
    })
}

exports.atualizarProduto = (req, res) => {
    const{id_produto} = req.params;
    const{nome,descricao,valor_unitario,imagem} = req.body;
    const{error}=
    produtoSchema.validate({id_produto,nome,descricao,valor_unitario,imagem});
    if(error){
        res.status(400).json({error: 'Dados do Produto Invalidos'});
        return;
    }
    db.query('Update produto SET ? WHERE id_produto = ?',[atualizarProduto,id_produto],(err,result) => {
        if(err){
            console.error('Erro ao atualizar o Produto',err);
            res.status(500).json({error: 'Erro interno do servidor'});
            return;
        }
        res.json({message: 'Produto atualizado com sucesso'});
    });
};

exports.deletarProduto = (req,res) => {
    const {id_produto} = req.params;
    db.query('DELETE FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso' });
    });
};

exports.adicionarProduto = (req,res) => {
    const { id_produto, nome_produto, descricao, valor_unitario, imagem} = req.body;
    const { error } = produtoSchema.validate({id_produto, nome_produto, descricao, valor_unitario, imagem});
    const novoProduto = {
        id_produto,
        nome_produto,
        descricao,
        valor_unitario,
        imagem
    };
    db.query('INSERT INTO produto SET ?', novoProduto, (err, result) => {
        if (err){
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({message: 'Produto adicionado com sucesso' });
    });
};
