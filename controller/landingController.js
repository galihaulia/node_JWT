const index = (req, res, next) => {
    res.render('index', {layout: 'layout_LandingPage'});
};

module.exports = {
    index: index
}