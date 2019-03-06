exports.get404 = (req, res, next) => {
    const path = req.url;
    console.log(path);
    if (path != '/' && path != '/admin/add-product') {
        res.status(404).render('404', {
            pageTitle: '404 Page',
            path: path
        });
        return;
    }
};
