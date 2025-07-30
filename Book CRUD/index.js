const express = require('express');
const app = express();
const { connectdb, bookModel } = require('./db.js');

app.use(express.json())

app.get('/test' , (req,res) => {
    res.status(200).json({message: "TEST CODE"})
})
app.post('/add', async(req, res) => {
    const {title , description, price,stockQuantity,category,authors} = req.body;

    try{
        const result = await bookModel.create({title,description,price,stockQuantity,category,authors})
        res.status(200).json({message: "Book Add successfully", book: result});
    }

    catch(err) {
        res.status(404).json(err);
    }
})
app.listen(8521,() => {
    console.log('Server running')
    connectdb();
})