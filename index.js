require('dotenv').config();


const express = require('express');
const cors = require('cors')

const {dbConnetion} =require('./database/config');


//crear servidor
const  app = express();

//middlewhare
app.use(cors());
app.use(express.json());


dbConnetion();

//routes
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/login',require('./routes/login'))





app.listen(process.env.PORT);