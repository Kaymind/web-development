const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  image: String,
  stock: Number,
  price: Number,
  created: {type: Date, default: Date.now}  
},{ _id: false }); 

productSchema.plugin(AutoIncrement, {inc_field: 'product_id'});
module.exports = mongoose.model('products', productSchema)


