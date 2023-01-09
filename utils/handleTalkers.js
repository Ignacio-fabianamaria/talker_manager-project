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

module.exports = {
    getAllTalkers,
    getTalkerID,
};