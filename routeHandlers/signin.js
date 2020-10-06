const bcrypt = require('bcrypt');

const signin = (req, res, db) => {
    const lowerCaseEmail = req.body.email.toLowerCase();
    db.select('email', 'hash').from('login')
        .whereRaw('LOWER(email) = ?', [lowerCaseEmail])
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .whereRaw('LOWER(email) = ?', [lowerCaseEmail])
                    .then(user => {
                        console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'));
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('signin credentials are incorrect'));
}

module.exports.signin = signin;