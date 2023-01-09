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
}

module.exports = {
    getAllTalkers,
};