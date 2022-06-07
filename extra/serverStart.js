let http=require('http');
let start=(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    
        res.end("<h1>Hello User How are you? I hope you are well</h1>");
   
    
}
 let server=http.createServer(start);
 server.listen(100,()=>{
     console.log("Server is running at port 100");
 });