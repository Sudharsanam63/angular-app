const express=require('express');
const cors=require('cors');
const app=express();

const TaskList=require('./database/models/taskList')
const Task=require('./database/models/task')

//middleware
app.use(cors())

//body parser
app.use(express.json());

/*
Route - TaskList-Create ,Update,Element By Id ,AllElemeny
*/
app.get('/tasklists',(req,res)=>{
    TaskList.find({})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});


//to get element by id
app.get('/tasklists/:tasklistid',(req,res)=>{

    let tasklistid=req.params.tasklistid;
    TaskList.find({_id:tasklistid})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});


//post to create
app.post('/tasklists',(req,res)=>{
    console.log(req.body.title);
    let taskfields={'title':req.body.title};
    TaskList(taskfields).save()
    .then((lists)=>{
        res.status(201).send(lists);
        
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

//to update element by id
app.put('/tasklists/:tasklistid',(req,res)=>{

    TaskList.findOneAndUpdate({_id:req.params.tasklistid},{$set:req.body})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});
//to update element by id
app.patch('/tasklists/:tasklistid',(req,res)=>{

    TaskList.findOneAndUpdate({_id:req.params.tasklistid},{$set:req.body})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});


//to delete element by id
app.delete('/tasklists/:tasklistid',(req,res)=>{

    TaskList.findByIdAndDelete(req.params.tasklistid)
    .then((lists) => {
        res.status(201).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

//CORS - cross origin request security 
const mongoose=require('./database/mongoose');

// arrow function
app.listen(3000,()=>{
    console.log('hello i""m ready');
})