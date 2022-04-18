const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const User = require('../models/User');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Promise
        Product.find({})
            .then((products) => {
                res.render('home', { 
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res, next) {  
        res.render('search');
    }
    
}

module.exports = new SiteController();