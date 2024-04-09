const db = require('./db');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const clienteSchema = Joi.object({
    nome: Joi.string().required,
    endereco: Joi.string().required,
    bairro: Joi.string().required,
    cep: Joi.string().required,
    cpf: Joi.string().length(11).required,
    login: Joi.string().required,
    senha: Joi.string().min(6).required,
});

exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};

exports.buscarCliente = (req, res) => {
    const { cpf } = req.params; //acessa o cpf do cliente na rota
    db.query('SELECT * FROM cliente WHERE id_produto = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }

        res.json(result[0]);//retorna o primeiro cliente encontrado (deve ser único)
    })
}

exports.adicionarCliente = (req, res) => {
    const { nome, endereco, bairro, cep, cpf, login, senha} = req.body;// req.body acessa objeto do corpo da requisição que foi recebido.

    const { error } = clienteSchema.validate({nome, endereco, bairro, cep, cpf, login, senha});//clienteSchema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionar no banco.
    bcrypt.hash(senha,10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        const novoCliente = {
            nome,
             endereco,
              bairro,
               cep,
               cpf,
                login,
                senha: hash
        };
        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err){
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Cliente adicionado com sucesso' });
        });
    })
};

exports.atualizarCliente = (req, res) => {
    const {cpf} =req.params;
    const {nome, endereco, bairro, cep, login, senha} = req.body;
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cep, cpf, login, senha});
    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        const clienteAtualizado = {
            nome,
            endereco,
            bairro,
            cep,
            cpf,
            login,
            senha: hash // Aqui passamos a senha criptografada
        };
        db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Cliente atualizado com sucesso' });
        });
    });
};

exports.deletarCliente = (req, res) => {
    const { cpf } = req.params;
    db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Cliente deletado com sucesso' });
    });
};