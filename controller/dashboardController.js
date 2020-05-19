const User = require('../models').User;

const dashboard = (req, res, next) => {
    User.findOne({
            where: {id: req.userId}
        })
        .then(user => {
            // res.status(200).json({
            //     "description": "User Content Page",
            //     "user": user
            // });
            res.render('dashboard', {layout: 'layout_AdminPanel', user: user});
        })
        .catch(err => {
            res.status(500).json({
                "description": "Can not access User Page",
                "error": err
            });
        })
}

module.exports = {
    dashboard: dashboard
}