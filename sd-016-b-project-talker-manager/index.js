const express = require('express');

const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const {
  isValidEmail,
  isValidPassword,
} = require('./Middleware/loginVerification');

const {
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
} = require('./Middleware/postTalkerVerification');

const generateRamdomToken = require('./utils/randomToken');

const PathOfTalker = path.resolve('talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await fs.readFile(PathOfTalker, 'utf-8');

  const talkerJson = JSON.parse(talker);

  return res.status(HTTP_OK_STATUS).send(talkerJson);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talker = await fs.readFile(PathOfTalker, 'utf-8');

  const talkerConverted = JSON.parse(talker);

  const filteredTalker = talkerConverted.find((tal) => tal.id === Number(id));

  if (!filteredTalker) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(HTTP_OK_STATUS).send(filteredTalker);
});

app.post('/login', isValidEmail, isValidPassword, async (_req, res) => {
  const token = generateRamdomToken(16);

  res.status(HTTP_OK_STATUS).json({
    token,
  });
});

app.post(
  '/talker',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
    const { name, age, talk } = req.body;

    const talkerFile = await fs.readFile(PathOfTalker, 'utf-8');

    const talkerFileParse = JSON.parse(talkerFile);

    const newTalker = { id: talkerFileParse.length + 1, name, age, talk };
    talkerFileParse.push(newTalker);

    fs.writeFile(PathOfTalker, JSON.stringify(talkerFileParse));

    res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async ({ params: { id }, body: { name, age, talk } }, res) => {
    const talkers = JSON.parse(await fs.readFile(PathOfTalker, 'utf-8'));

    const talkerIndex = talkers.findIndex((el) => el.id === +id);

    talkers[talkerIndex] = {
      ...talkers[talkerIndex],
      name,
      age,
      talk,
    };
    await fs.writeFile(PathOfTalker, JSON.stringify(talkers));

    res.status(200).send({ id: +id, name, age, talk });
  },
);

app.delete('/talker/:id', isTokenValid, async (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(await fs.readFile(PathOfTalker, 'utf-8'));

  const updatedTalkers = talkers.filter((tal) => tal.id !== +id);

  await fs.writeFile(PathOfTalker, JSON.stringify(updatedTalkers));

  res.status(204).end();
});

app.listen(PORT, () => console.log('Online'));
