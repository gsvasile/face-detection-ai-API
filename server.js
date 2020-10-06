const express = require('express');
const cors = require('cors');
const knex = require('knex');
const registerHandler = require('./routeHandlers/register');
const profileHandler = require('./routeHandlers/profile');
const imageHandler = require('./routeHandlers/image');
const signinHandler = require('./routeHandlers/signin');

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
    signinHandler.signin(req, res, db);
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    registerHandler.register(email, name, password, res, db);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    profileHandler.getProfile(id, res, db);
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    imageHandler.getImageFaceInformation(res, id, db);
})

app.listen(3001, () => {
    console.log('all systems are a go, port 3000');
});