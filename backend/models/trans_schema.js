const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const transSchema = mongoose.Schema({ 
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true },
  subtotal: Number,
  discount: Number,
  shipping_cost: Number,
  tax_percent: Number,
  total: Number,
  paid: Number,
  change: Number,
  order_list: String,
  payment_type: String,
  payment_detail: String,
  staff_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  seller_id: String,
  buyer_id: String,
  comment: String,
  timestamp: {type: Date, default: Date.now}
},{ _id: false }); 

transSchema.plugin(AutoIncrement, {inc_field: 'transaction_id'});
module.exports = mongoose.model('trans', transSchema)