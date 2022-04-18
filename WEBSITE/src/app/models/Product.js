const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema; 

const Product = new Schema({
    name: { type: String, required: true, },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    price: { type: String, maxLength: 255 },
    pricecurrent: { type: String, maxLength: 255 },
    priceold: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});

//Add plugins
mongoose.plugin(slug);
Product.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all' ,
});

module.exports = mongoose.model('Product', Product);