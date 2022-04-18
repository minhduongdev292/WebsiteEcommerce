const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const productsRouter = require('./products');
const usersRouter = require('./users');
const cartsRouter = require('./carts')

function route(app){


    app.use('/news', newsRouter);

    app.use('/me', meRouter);

    app.use('/users', usersRouter);

    app.use('/products', productsRouter);

    app.use('/carts', cartsRouter);

    app.use('search', siteRouter);

    app.use('/', siteRouter);
}

module.exports = route;