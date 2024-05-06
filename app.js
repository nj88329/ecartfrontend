const dotenv = require("dotenv").config();

const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const cors = require("cors");
// const stripe = require('stripe')('sk_test_51P6CVYSD6JrlAzPKA8k6BZ5c5NEWkETBt8vQysvDgWQUfvwfrwJNjFGiU64JGTqiJvYS7DHCh6fkLBoMzhsB9OQP00mC7EfhMB');

connectDb();

const app = express();
app.use(cors());

const PORT = 3000 || process.env.PORT ;




app.use(express.json());

app.use('/api/contacts', require("./routes/contactRoutes") );
app.use('/api/products', require("./routes/productRoutes") );
app.use('/api/users', require("./routes/userRoutes") );
app.use(errorHandler);

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
});


