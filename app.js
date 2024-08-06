const express=require('express');
const app=express();

/* app.listen(3000,function(){
    console.log('hello i""m ready')
}) */

const mongoose=require('./database/mongoose');

// arrow function
app.listen(3000,()=>{
    console.log('hello i""m ready');
})