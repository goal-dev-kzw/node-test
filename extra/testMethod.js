let http=require('http');
let start=(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    if(req.method=="GET"){
        res.end("<h1>Hello User How are you? I am Get Method</h1>");
    }else{
        res.end("<h1>Hello User How are you? I am Post Method</h1>");
    }
    
}
 let server=http.createServer(start);
 server.listen(200,()=>{
     console.log("Server is running at port 200");
 });