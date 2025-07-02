const http = require("http")
let server = http.createServer((req,res)=>{
    console.log(1,2)
    res.end("i am from server")

})
server.listen(2004,()=>{
    console.log(">>>>>server running.....")
})