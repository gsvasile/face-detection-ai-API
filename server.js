const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const registerHandler = require('./routeHandlers/register');
const profileHandler = require('./routeHandlers/profile');
const imageHandler = require('./routeHandlers/image');
const signinHandler = require('./routeHandlers/signin');

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'okidoit',
        database: 'brain-ai'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/signin', (req, res) => {
    signinHandler.signin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    registerHandler.register(req, res, db, bcrypt, saltRounds);
});

app.get('/profile/:id', (req, res) => {
    profileHandler.getProfile(req, res, db);
});

app.put('/image', (req, res) => {
    imageHandler.getImageFaceInformation(req, res, db);
})

app.listen(3001, () => {
    console.log('all systems are a go, port 3001');
});