const express = require('express');
const { getAllTalkers } = require('../utils/handleTalkers');

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

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

/* Recursos utilizados para o desenvolvimento do projeto:
Mentoria Estruturada: Esquenta do projeto TalkerManager - Parte 1 (Turma 23 - Tribo A)
*/
