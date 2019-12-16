const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();




const userRoute = require('./routes/user');



require('./db');




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));



app.use('/user', userRoute);






const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server started..."));

