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

app.post('/signin', signinHandler.signin(db, bcrypt));

app.post('/register', registerHandler.register(db, bcrypt, saltRounds));

app.get('/profile/:id', profileHandler.getProfile(db));

app.put('/image', imageHandler.getImageFaceInformation(db));
app.post('/imageurl', imageHandler.handleApiCall());

app.listen(3001, () => {
    console.log('all systems are a go, port 3001');
});