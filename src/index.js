const express = require('express');
const { randomBytes } = require('crypto');// método crypto.randomBytes() é usado para gerar dados aleatórios criptograficamente

const { getAllTalkers, getTalkerID, validateEmail, validatePassword, 
  validateName, validateAuthorization, validateAge,
  validateTalk, validateWatchedAT, validateRate, addTalkers } = require('../utils/validations');

const app = express();
app.use(express.json());// deve ser colocado antes das rotas. Analisa as solicitações para interpretat corretamente dados no corpo da reqsição

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('testando rota');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  return res.status(200).json(talkers);
}); 

app.get('/talker/:id', async (req, res) => {
const id = Number(req.params.id);// convertendo id para um valor numérico
const talkerID = await getTalkerID(id);
if (!talkerID) {
 return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
} 
  return res.status(200).json(talkerID);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
const getToken = randomBytes(8).toString('hex');
res.status(200).json({ token: `${getToken}` }); 
});

app.post('/talker', validateName, validateAuthorization,
validateAge, validateTalk, validateWatchedAT, validateRate, async (req, res) => {
  const newRegister = req.body;

  const talkerList = await getAllTalkers();

  const id = talkerList.length + 1;// criando um novo id

  const updatedTalkerList = { id, ...newRegister };// guarda o cadastro adicionado juntamente com seu respectivo id

  talkerList.push(updatedTalkerList); // envia para talkersLista o novo registro

  await addTalkers(talkerList);

  res.status(201).json(updatedTalkerList);
  });

  app.put('/talker/:id', validateName, validateAuthorization,
  validateAge, validateTalk, validateWatchedAT, validateRate, async (req, res) => {
    const { id } = req.params; // captura o id do parametro da URL
    const talkerEdit = req.body;// captura os dados do cadastro que foram editados do corpo da requisição

    const talkerList = await getAllTalkers();
    const toEditTalker = talkerList.findIndex((e) => e.id === Number(id));// busca o id na lista de talkers cadastrados
    talkerList[toEditTalker] = { id: Number(id), ...talkerEdit };// edita os dados do talker  correspondente ao id buscado
    await addTalkers(talkerList);

    res.status(200).json(talkerList[toEditTalker]);
  });

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

/* Recursos utilizados para o desenvolvimento do projeto:
- Mentoria Estruturada: Esquenta do projeto TalkerManager - Parte 1 (Turma 23 - Tribo A)
- Método Node.js crypto.randomBytes() - https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
- NODE.JS | MÉTODO CRYPTO.RANDOMBYTES() - https://acervolima.com/node-js-metodo-crypto-randombytes/
*/
