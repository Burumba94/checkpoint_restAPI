require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.js');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

//définition de modèle
const User = require('./models/User.js');

const newUser = new User ({
    name : 'Antoine Diémé',
    age : 29,
    email : 'antoinedieme94@gmail.com',
});

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
    console.log('Connecté à la base de données');
});

app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
}); 

