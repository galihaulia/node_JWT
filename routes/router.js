const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const landingController = require('../controller/landingController');
	const authController = require('../controller/authController');
	const dashboardController = require('../controller/dashboardController');
	const profileController = require('../controller/profileController');

    app.get('/', landingController.index);
	
	app.get('/signup', authController.signupGet);
	app.post('/signup', verifySignUp.checkDuplicateUserNameOrEmail, authController.signupPost);
	
	app.get('/login', authController.loginGet);
	app.post('/login', authController.loginPost);
	
	app.get('/dashboard', authJwt.verifyToken, dashboardController.dashboard);

	app.get('/profile', authJwt.verifyToken, profileController.profile);
	app.post('/profile', authJwt.verifyToken, profileController.profileUpdate);
	// app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	// app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}