const { readFile } = require('fs/promises');// fs - módulo para interagir com o sistema de arquivos
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'src', 'talker.json');

const getAllTalkers = async () => {
    try {
        const response = await readFile(talkerPath);// modulo fs.readFile para ler talker.json 
        const talkers = JSON.parse(response);
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

module.exports = {
    getAllTalkers,
    getTalkerID,
    insertLogin, 

};