require('dotenv').config();
let express = require('express'),
    app = express(),
    path = require('path'),
    hogan = require('hogan-express'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index');
})

io.sockets.on('connection', (socket) => {
    socket.on("login", data => {
        socket.username = data;
        // io.sockets.connected[socket.id].emit('login-success', true);    #send message to certain user =#send message only to sender-client
        // io.emit('login-success', true);         #sending to All Users
        // socket.emit('login-success', true);     #send message only to sender-client
        // socket.broadcast.emit('login-success', true);      #send to all listeners except sender

    });
    socket.on('msg', data => {
        io.emit('income-msg', socket.username + " : " + data);
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`);
})


