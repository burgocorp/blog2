const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err.message));