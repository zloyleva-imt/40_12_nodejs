const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const expressValidator = require('express-validator');
app.use(expressValidator());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('store', 'root', '123456789root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const sync = () => {
    return sequelize.sync({force: true});
};

sync()
    .then(()=>console.log("DB was synced..."))
    .catch(err=>console.log(err.message));

app.get('/', (req, res) => {
    res.send("Shoes shop\n");
});

const products = require('./routes/products');
app.use('/products', products);

const cards = require('./routes/cards');
app.use('/cards', cards);

app.listen(3000, err => {
    if(err){
        console.log('\x1b[31m', 'Error...');
    }
    console.log('\x1b[36m%s\x1b[0m', 'App was started... on 3000 port');
});
