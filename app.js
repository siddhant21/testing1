const express = require('express');
const path  =   require('path');
const mongoose=require('mongoose');
const user=require('./models/userSchema');
const encrypt =require('mongoose-encryption');

//creating a port for heroku and local machine
var PORT = process.env.PORT || 3000;

const app=express();


//mongoose connection
mongoose.connect('mongodb+srv://siddhantuser:siddhantpassword@mycluster2107.rdvqb.mongodb.net/blog?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex :true,
    useUnifiedTopology :true
});
const db=mongoose.connection;
db.on("error" ,console.error.bind(console ,"connection error"));
db.once("open",()=>{
    console.log(("database cnnected"));
});


app.use(express.urlencoded({extended:true}));
//ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/register',(req,res)=>{
    res.render('loginPage');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.post('/register',(req,res)=>{
    const newUser=new user({
        email:req.body.username,
        password:req.body.password
    });
    newUser.save(function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('home');
        }
    });
});
app.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    user.findOne({email:username},(err,found)=>{
        if(err)
        {
            res.send("not logged in properly");
            // res.redirect('/login');
        }
        else{
            if(found)
            {
                if(found.password===password)
                {
                    res.render("home");
                }
            }
        }
    });
});
app.listen(PORT,()=>{
    console.log("server started");
});