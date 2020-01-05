const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');
const serialize = require('./util/database');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

serialize
    // .sync({force: true}) // force untuk paksa membuat tabel baru, JANGAN AKTIFKAN FORCE SAAT DI PRODUCTION SERVER
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: "Moden",
                email: "moden@gmail.com"
            });
        }

        return user;
    })
    .then(user => {
        // console.log(user)
        app.listen(3000);
    })
    .catch(err => {
        // console.log(err)
    });

// app.listen(3000);
