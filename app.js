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

    const deleTaskelement=(taskList)=>{
        Task.deleteMany({_taskListId:req.params.tasklistid})
        .then(()=>{
            return taskList;
        })
        .catch((err)=>{console.log(err);
        })
    };
    const resp = TaskList.findByIdAndDelete(req.params.tasklistid)
    .then((lists) => {
        deleTaskelement(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
    res.status(200).send(resp);
});


/*Task Operations getting list tasks*/
app.get('/tasklists/:tasklistid/tasks',(req,res)=>{
    Task.find({_taskListId:req.params.tasklistid})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});
/*Task Operations getting list task by id*/
app.get('/tasklists/:tasklistid/tasks/:taskid',(req,res)=>{
    Task.findOne({_taskListId:req.params.tasklistid,_id:req.params.taskid})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

/*Task Operations list insertion*/
app.post('/tasklists/:tasklistid/tasks',(req,res)=>{
    let taskfields={'title':req.body.title,_taskListId:req.params.tasklistid};
    Task(taskfields).save()
    .then((lists)=>{
        res.status(201).send(lists);
        
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

/*Task Operation list delete list by ID*/
//to delete element by id
app.delete('/tasklists/:tasklistid/tasks/:taskid',(req,res)=>{

    Task.findByIdAndDelete(req.params.taskid)
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

//to update more than one element component by id of task
//to update element by id
app.put('/tasklists/:tasklistid/tasks/:taskid',(req,res)=>{

    Task.findOneAndUpdate({_taskListId:req.params.tasklistid,_id:req.params.taskid},{$set:req.body})
    .then((lists) => {
        res.status(200).send(lists);
    })
    .catch((err)=>{console.log(err);
        res.status(500);
    })
});

//to update single element component by id of task
app.patch('/tasklists/:tasklistid/tasks/:taskid',(req,res)=>{

    Task.findOneAndUpdate({_taskListId:req.params.tasklistid,_id:req.params.taskid},{$set:req.body})
    .then((lists) => {
        res.status(200).send(lists);
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