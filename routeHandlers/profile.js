const getProfile = (id, res, db) => {
    db.select('*').from('users').where({ id })
        .then(user => {
            user.length ? res.json(user[0]) : res.status(400).json('Not Found.');
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports.getProfile = getProfile;