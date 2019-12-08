const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');




const userRoute = require('./routes/user');



require('./db');




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));



app.use('/user', userRoute);






const PORT = 3000;
app.listen(PORT, console.log("server started..."));

