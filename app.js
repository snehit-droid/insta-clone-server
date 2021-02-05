const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo db');
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongo db', err);
})

require('./models/user')
require('./models/post')
//we can use the above model using {mongoose.model("User")}

app.use(cors());
app.use(express.json()); 
//parsing of data in the body just like "bodyParser"
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));




// const customMiddleware = (req, res, next) => {
//     console.log("middleware executed!!");
//     next();
// }

// // app.use(customMiddleware);  //middleware is applied for all the routes

// app.get('/', customMiddleware, (req, res) => {
//     res.send("hello world");
// })      //customMiddleware is applied as middleware to only this route.

app.listen(PORT, () => {
    console.log("server is running on", PORT);
}); //(PORT, {callback function})