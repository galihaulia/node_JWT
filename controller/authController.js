const config = require('../config/secret');
const User = require('../models').User;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//#region SignUp
const signupGet = (req,res, next) => {
	res.render('signup', {layout: 'layout_Login'});
}
const signupPost = (req, res, next) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
			developer_name: req.body.developer_name,
			email: req.body.email,
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 8)
		})
		.then(user => {
			res.send("User registered successfully!");
		})
		.catch(err => {
			res.status(500).send("Fail! Error -> " + err);
		})
}
//#endregion

//#region Login
const loginGet = (req,res, next) => {
	console.log('get login');
	res.render('login', {layout: 'layout_Login'});
}
const loginPost = (req, res, next) => {
	console.log("Log-In");
	
	User.findOne({
			where: {
				username: req.body.username
			}
		})
		.then(user => {
			if (!user) {
				return res.status(404).send('User Not Found.');
			}

			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
			}
			
			var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
			});
			// res.status(200).send({ auth: true, accessToken: token });
			res.redirect('/dashboard');
		})
		.catch(err => {
			res.status(500).send('Error -> ' + err);
		});
}
//#endregion

module.exports = {
	signupGet: signupGet,
	signupPost: signupPost,
	loginGet: loginGet,
	loginPost: loginPost
}