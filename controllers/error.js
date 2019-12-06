exports.get404 = (req, res, next) => {
    const path = req.url;
    res.status(404).render('404', {
        pageTitle: '404 Page',
        path: '/404'
    });
};
