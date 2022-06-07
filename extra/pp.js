const http = require('http'),
    querystring = require('querystring');

const server = http.createServer((request, response) => {
    if(request.method === 'POST' && request.url === '/form-submit') {
        let body = '';
        
        // very important to handle errors
        request.on('error', (err) => {
            if(err) {
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.write('An error occurred');
                response.end();
            }
        });
        
        // read chunks of POST data
        request.on('data', chunk => {
            body += chunk.toString();
        });

        // when complete POST data is received
        request.on('end', () => {
            // use parse() method
            body = querystring.parse(body);
            
            // { name: 'John', gender: 'MALE', email: 'john@gmail.com' }
            console.log(body);

            // rest of the code
        });
    }
    
    // rest of the code
});

server.listen(500, () => {
    console.log("server is running at port 500");
});