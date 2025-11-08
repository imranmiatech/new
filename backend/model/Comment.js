// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Anonymous', // ডিফল্ট হিসেবে 'Anonymous' রাখা হয়েছে
  },
  blogId: {
    type:String, //mongoose.Schema.Types.ObjectId,
    ref: 'Blog', // ব্লগের সাথে রেফারেন্স
    required: true,
 },
  createdAt: {
    type: Date,
    default: Date.now, // কমেন্ট তৈরি করার সময় স্বয়ংক্রিয়ভাবে সেট হবে
  },
});

module.exports = mongoose.model('Comment', commentSchema);
///