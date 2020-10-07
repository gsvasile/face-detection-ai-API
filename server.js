const express = require('express');
const bcrypt = require('bcryptjs');
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
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const app = express();

app.use(express.json());
app.use(cors());


console.log('------------START START UP---------------');
db.select('id', 'name').from('users')
    .then(data => console.log('---DATA----: ' + data))
    .catch(err => console.log('---ERROR --: ' + err));
console.log('------------END START UP---------------');
app.get('/', (req, res) => {
    res.send('success');
});

app.post('/signin', signinHandler.signin(db, bcrypt));
app.post('/register', registerHandler.register(db, bcrypt, saltRounds));
app.get('/profile/:id', profileHandler.getProfile(db));
app.put('/image', imageHandler.getImageFaceInformation(db));
app.post('/imageurl', imageHandler.handleApiCall());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`all systems are a go on port ${PORT}`);
});