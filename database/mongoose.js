const mongoose=require('mongoose');

//For Asynchronous operations 
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb')
.then(()=>{
    console.log('Database connected')
})
.catch((error)=>{
    console.log("Error connecting to database",error)
});

module.exports =mongoose;

