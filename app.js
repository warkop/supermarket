const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
    User.findOne().then(user => {
        req.user = user;
        next();
    }).catch();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

serialize
    // .sync({force: true}) // force untuk paksa membuat tabel baru, JANGAN AKTIFKAN FORCE SAAT DI PRODUCTION SERVER
    .sync()
    .then(result => {
        return User.findOne();
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
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        // console.log(err)
    });

// app.listen(3000);
