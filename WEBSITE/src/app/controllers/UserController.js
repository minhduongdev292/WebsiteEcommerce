const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class UserController {
    signup(req, res, next) {
        var messages = req.flash('error');
        res.render('users/signup', { csrfToken: req.csrfToken(), 
            messages: messages,
            hashErrors: messages.length > 0, 
        });
    }

    signin(req, res, next) {
        var messages = req.flash('error');
        res.render('users/signin', { csrfToken: req.csrfToken(), 
            messages: messages,
            hashErrors: messages.length > 0, 
        });

    }
}
module.exports = new UserController();































