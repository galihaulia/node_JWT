const User = require('../models').User;

const profile = (req, res, next) => {
    User.findOne({
            where: {id: req.userId}
        })
        .then(user => {
            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
            // res.render('profile', {layout: 'layout_AdminPanel', user: user});
        })
        .catch(err => {
            res.status(500).json({
                "description": "Can not access User Page",
                "error": err
            });
        })
}

const profileUpdate = (req, res, next) => {
    const dataUser = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone
    }
    User.update(dataUser, {
            where: {id: req.userId}
        })
        .then(user => {
            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
        })
        .catch(err => {
            res.status(500).json({
                "description": "Can not access User Page",
                "error": err
            });
        });
}

module.exports = {
    profile: profile,
    profileUpdate: profileUpdate
}