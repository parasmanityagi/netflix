const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Connection = require('./database/db');
const UserRoutes = require('./routes/UserRoutes');

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

const URL = process.env.DB_URL;
Connection(URL);

app.use('/api/user' , UserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on port number : ${PORT}`);
})