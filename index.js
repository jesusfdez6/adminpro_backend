require('dotenv').config();


const express = require('express');
const cors = require('cors')

const {dbConnetion} =require('./database/config');


//crear servidor
const  app = express();

//middlewhare
app.use(cors());


dbConnetion();

app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:"hola mundo"
    });
} );


app.listen(process.env.PORT);