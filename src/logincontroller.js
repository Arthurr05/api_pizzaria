const db = require('./db');

const bcrypt = require('bcrypt');

// Importando o JWT para gerar o token de autenticção
const jwt = require('jsonwebtoken');

// Definindo o segredo de autenticação
const SECRET = 'arthurabreu';

exports.loginCliente = (req, res) => {
    const { login, senha } = req.body;

    db.query('SELECT * FROM cliente WHERE login = /', login, (err, results) => {
        if (err) {
            console.error('Erro ao nuscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if(results.length ===0) {
            res.status(401).json({ error: 'Cliente não encontrado' });
            return;
        }
        const cliente = results[0];
        // Comparar a senha inserida com a senha criptografada no banco de dados
        bcrypt.compare(senha, cliente.senha, (err,passwordMatch) =>{
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            } else {
                //Gerar um token JWT e enviá-lo como resposta
                const token = jwt.sign({ login: cliente.login}, SECRET, { expiresIn: '1h' });
                //sign assina o token gerado com info do meu usuário
                res.status(200).json({
                    auth: true,
                    token,
                    message: 'usuario Logado'
                });
            }
        });
    });
}
exports.autenticarToken = (req, res, next) => {
    //Verificar se o token está presente no cabeçalho da requisição
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({ error: 'Token não fornecido'});
    }
    //Verificar se o token é válido
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido'});
        }
        // Armazenar o usuário autenticado na requisição
        req.usuario = decoded;
        next(); // Chame next() para prosseguir para a próxima rota
    });
}