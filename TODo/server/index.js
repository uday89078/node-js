const express = require("express")
const fs = require("fs")
const cors = require('cors')


const app = express();


app.use(express.json()) //middleware
app.use(cors())

// ******************** get product ********************

app.get('/product',(req,res)=>{
    
    fs.readFile('./db.json',"utf-8",(err,data)=>{
    
        if(err)
        {
            res.send(err)
        }
        
        else
        {
            const {product} = JSON.parse(data)
            res.send(product)
        }

    })
    
})

// ******************** add product ********************

app.post('/addproduct', (req, res) => {
  
    fs.readFile('./db.json', "utf-8", (err, data) => {
    
        if (err) 
        {
        res.status(500).send("Error reading database.");
        }
        
        else 
        {

            const dataFromdb = JSON.parse(data);

            let productID = dataFromdb.product.length
                ? dataFromdb.product[dataFromdb.product.length - 1].id
                : 0;

            const newSingleProductData = { ...req.body, id: ++productID };
            dataFromdb.product.push(newSingleProductData);

            fs.writeFile('./db.json', JSON.stringify(dataFromdb, null, 2), (err) => {
                
                if (err) 
                {
                    res.status(500).send("Error writing to database.");
                } 
                
                else 
                {
                    res.status(201).send(newSingleProductData); 
                }

            });

        }

    })

})

// ******************** delete product ********************

app.delete('/deleteproduct/:id',(req,res)=>{
    // console.log(req.params)
    const {id} = req.params
    fs.readFile('./db.json',"utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }

        else
        {
            const dataFromdb = JSON.parse(data)
            const filterProduct = dataFromdb.product.filter((el)=>el.id!=id)
            fs.writeFile('./db.json',JSON.stringify({product:filterProduct}),(err)=>{
                if(err)
                {
                    res.send(err)
                }

                else
                {
                    res.send("Data is deleted")
                }
            })
        }
    })
    res.send("Data Deleted")
})

// ********************************************************

app.listen(1212,()=>{
    console.log("Server Running....!")
})