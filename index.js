const express=require('express')
const bodyparser=require('body-parser')
const request=require('request')
const mongoose=require("mongoose")
const app=express()
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','ejs');


mongoose.connect("mongodb://localhost:27017/vhelpblog",{useNewUrlParser:true});

const question=mongoose.model('question',{question:String,category:Object,answer:String})

app.get("/",(req,res)=>{
    res.render('index');
    // question.find(function(err,fruits){
    //     if(err){
    //         console.log(error);
    //     }
    //     else{
    //         console.log(fruits);
    //     }
    // });
});


app.post("/",(req,res)=>{
    console.log("Question posted!!");

    var cat=[]
    categories=function(){
        
        if(req.body.radio_acad=="on"){
            cat.push("Academics")
        }
        if(req.body.radio_place=="on"){
            cat.push("Placement")
        }
        if(req.body.radio_infra=="on"){
            cat.push("Infrastructure")
        }
        if(req.body.radio_club=="on"){
            cat.push("Clubs/Teams")
        }
        if(req.body.radio_acti=="on"){
            cat.push("Activities")
        }
        if(req.body.radio_gen=="on"){
            cat.push("General FAQ's")
        }
    }
    let ques=req.body.question_area;
    if(ques.length!=undefined){
        categories()
        const newQuestion=new question({question:ques,category:cat});
        newQuestion.save()
    }
    question.find(function(err,fruits){
        if(err){
            console.log(error);
        }
        else{
            console.log(fruits);
        }
    });
    res.redirect("/");
});


app.get("/answers/:category",(req,res)=>{
    res.render('answers');
    console.log(req.param("category"));
    let category=category;
});


app.get("/blog_admin",(req,res)=>{
    res.render("admin_login");
});


app.post("/i-super-user",(req,res)=>{
    let ques=[];
    // sending full data from data-base
    question.find(function(err,que){
        if(err){
            console.log(err)
        }
        else{
            ques.push(que);
            console.log(que);
        }
    });
    console.log(ques.length);
    ques=[{
        _id: "5f1ba6ec55f1aa1662eae14c",
        question: 'helloe enfnf nknkenfnenfkee nkwnkwnknnek knwwkkmeol2klem nknkdnfk',
        category: [ 'Academics', 'Clubs/Teams' ],
        __v: 0
    }
    ];
    res.render("i-super-user",{all_ques:ques});
});


app.post("/blog_admin",(req,res)=>{
    console.log("User-Name:",req.body.email);
    console.log("Password:", req.body.password);
    res.redirect(307,"/i-super-user");
});


app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});