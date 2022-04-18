const express = require('express');
const router = express.Router();
const Cart = require('../app/models/Cart');
const Product = require('../app/models/Product');

router.get('/add-to-cart/:id', function (req, res, next) {
    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(ProductId, function (err, Product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(Product, Product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
}); 

router.get('/shopping-cart', (req,res,next)=>{
    if(!req.session.cart){
      return res.render('carts/shopping-cart', {Products: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('carts/shopping-cart', {Products: cart.generateArray(), totalPrice: cart.totalPrice});
  });


module.exports = router;