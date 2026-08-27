const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { checkAuth } = require('./middleware/checkAuth');

//routes
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const staticRoutes = require('./routes/static');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(checkAuth);

app.use('/product', todoRoutes);
app.use('/user', userRoutes);
app.use('/', staticRoutes);

connectDB();

app.listen(8000, () => {
    console.log("Server is running on PORT 8000");
})