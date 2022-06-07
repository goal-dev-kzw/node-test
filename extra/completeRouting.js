let bodyParser = require('body-parser');
let express = require('express'),
    app = express(),
    multer = require('multer'),
    path = require('path'),
    hogan = require('hogan-express');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', hogan);
app.set('view engine', 'html');


app.use(express.static('assets'));

let guestRoute = require('../routes/guestRoute')(express);
let userRoute = require('../routes/userRoute')(express);
let adminRoute = require('../routes/adminRoute')(express);

app.use('/', guestRoute);
app.use('/user',userRoute);
app.use('/admin',adminRoute);


app.listen(3400);