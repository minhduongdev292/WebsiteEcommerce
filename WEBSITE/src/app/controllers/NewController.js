
class NewController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /new/:slug
    show() {
        res.send("NEW DETAIL!!!");
    }
}

module.exports = new NewController;
