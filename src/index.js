const express = require('express');
const { getAllTalkers, getTalkerID } = require('../utils/handleTalkers');

const app = express();
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

/* Recursos utilizados para o desenvolvimento do projeto:
Mentoria Estruturada: Esquenta do projeto TalkerManager - Parte 1 (Turma 23 - Tribo A)
*/
