const register = (db, bcrypt, saltRounds) => (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        console.log('------------START--------------');
        console.log(trx);
        console.log('-----------TRXXXXXXXXXXXXXXXXXXX-----------');
        console.log(email);
        console.log('-----------EMAAAILLL-----------');
        console.log(hash);
        console.log('-----------ENDDDDD-----------');
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json('unable to register : ' + err));
}

module.exports.register = register;