const db = require('./db');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required,
    nome: Joi.string().required,
    endereco: Joi.string().required,
    bairro: Joi.string().required,
    cep: Joi.string().required,
    login: Joi.string().required,
    senha: Joi.string().min(6).required,
});

exports.listarClientes = (req,res) => {
    db.query('SELECT * FROM cliente', (err, result)=> {
        if (err) {
            console.error('Erri ai buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};