const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findOne().then(user => {
    //     req.user = user;
    //     next();
    // }).catch();
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(error.get404);

mongoConnect( () => {
    app.listen(3000);
})
