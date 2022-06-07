let express = require('express'),
    app = express(),
    multer = require('multer');

let guestRoute = require('../routes/guestRoute')(express);
let userRoute = require('../routes/userRoute')(express);
let adminRoute = require('../routes/adminRoute')(express);

app.use('/', guestRoute);
app.use('/user',userRoute);
app.use('/admin',adminRoute);


app.listen(3300);