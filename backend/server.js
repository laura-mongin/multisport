import express from 'express';
import { prisma } from './prisma.mjs';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API Multisport !");
});

app.get('/seances', async (req, res) => {
    const seances = await prisma.seance.findMany();
    res.json(seances);
});

app.get('/seances/:id', async (req, res) => { 
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).send('non valide')
  }
  const seances = await prisma.seance.findUnique({ where: { id: id, }, });
  if (seances == null) {
    return res.status(404).send("séance introuvable")
  }
  res.json(seances);
});

app.listen(PORT, () => {
  console.log(`Le serveur est démarré sur : http://localhost:${PORT}`);
});
