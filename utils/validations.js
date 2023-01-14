const { readFile, writeFile } = require('fs/promises');// fs - módulo para interagir com o sistema de arquivos
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'src', 'talker.json');

const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
const REGEX_DATE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;// REGEX_DATE --https://www.regextester.com/99555
const REGEX_RATE = /^[1-5]\d{0,5}$/;
// REGEX_RATE --https://pt.stackoverflow.com/questions/493376/validar-de-1-a-6-d%C3%ADgitos-sendo-que-o-primeiro-n%C3%A3o-pode-ser-zero

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
const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    
    if (email === undefined) {
       return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!REGEX_EMAIL.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (password === undefined) {
        res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
    
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) res.status(401).json({ message: 'Token não encontrado' });
    
    if (typeof authorization !== 'string' || authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (age === undefined) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;  
    if (talk === undefined) res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    next();
};
 
const validateWatchedAT = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    
    if (!watchedAt) res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

    if (!REGEX_DATE.test(watchedAt)) {
 return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
 next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    
    if (!rate) res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    
    if (!REGEX_RATE.test(Number(rate))) {
return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
 next();
};

const addTalkers = async (e) => {
    await writeFile(talkerPath, JSON.stringify(e));
    };

module.exports = {
    getAllTalkers,
    getTalkerID,
    validateEmail,
    validatePassword,
    addTalkers,
    validateName,
    validateAuthorization,
    validateAge,
    validateTalk,
    validateWatchedAT,
    validateRate,
};