const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Bookstore')
        console.log("database connected");
    }
    catch (err) {
        console.log(err);
    }
}

const bookschema = new mongoose.Schema({
    title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  category: String,          
  authors: [String]  
});

const bookModel = mongoose.model('book', bookschema);

module.exports = { connectdb, bookModel };