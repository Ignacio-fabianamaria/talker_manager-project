const { readFile } = require('fs/promises');// fs - módulo para interagir com o sistema de arquivos
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'src', 'talker.json');

const getAllTalkers = async () => {
    try {
        const response = await readFile(talkerPath);// modulo fs.readFile para ler talker.json (fs retorna uma string)
        const talkers = JSON.parse(response);// convertendo os dados em string da cont 'reponse' para objeto
        return talkers;
    } catch (error) {
        console.log('Arquivo não pode ser lido');
        return [];
    }
};

const getTalkerID = async (id) => {
    try {
        const response = await readFile(talkerPath);
        const talkerID = JSON.parse(response);
        const talkerFindID = talkerID.find((e) => e.id === Number(id));// buscando um id específico
        return talkerFindID;
    } catch (error) {
        console.log('Arquivo não pode ser lido');
    }
};

const insertLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

    if (email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!REGEX_EMAIL.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password === undefined) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (name === undefined) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAuthorization = (req, res, next) => {
   const { authorization } = req.headers;
   if (authorization === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
}
if (typeof authorization !== 'string' || authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
}
next();
};

module.exports = {
    getAllTalkers,
    getTalkerID,
    insertLogin, 
    validateName,
    validateAuthorization,
};