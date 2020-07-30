const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const mongoose = require("mongoose")
const app = express()
app.use(bodyparser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.use(express.static("public"));

var mongo = async ()=>{
    // mongoose.connect("mongodb://localhost:27017/vhelpblog", { useNewUrlParser: true });
    await mongoose.connect("mongodb+srv://shivansh-12:shivansh@cluster0.vvpfe.mongodb.net/vHelp?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true  });
};
mongo()

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://shivansh-12:shivansh12@cluster0.vroy2.mongodb.net/vHelp?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
const question = mongoose.model('question', { question: String, category: Object, answer: String });
// });


app.get("/", (req, res) => {
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


app.post("/", (req, res) => {
    console.log("Question posted!!");

    categories = function () {

        let cat = []

        if (req.body.radio_acad == "on") {
            cat.push("academics")
        }
        if (req.body.radio_place == "on") {
            cat.push("placement")
        }
        if (req.body.radio_infra == "on") {
            cat.push("infrastructure")
        }
        if (req.body.radio_club == "on") {
            cat.push("clubs_teams")
        }
        if (req.body.radio_acti == "on") {
            cat.push("activities")
        }
        if (req.body.radio_gen == "on") {
            cat.push("general")
        }
        return cat
    }
    let ques = req.body.question_area;
    if (ques.length != undefined) {
        let cat = categories();
        const newQuestion = new question({ question: ques, category: cat, answer:"No"});
        newQuestion.save()
    }
    question.find(function (err, fruits) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(fruits);
        }
    });
    res.redirect("/");
});


app.get("/:cat", async(req, res) => {
    let required_category = req.params.cat;
    console.log("Required Categort: ",required_category);
    let filtered= await question.find({ category : { $in : [required_category] }})
    console.log(filtered)
    res.render("answers",{answers: filtered});

});


app.get("/blog_admin", (req, res) => {
    res.render("admin_login");
});


app.post("/i-super-user",async(req, res) => {
    var reso;
    await question.find((err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            reso=data;
            console.log(5);
        }
    });
    // console.log(reso);
    res.render("i-super-user", { all_ques: reso });

});


// to update answer from i-super-user in database
app.post("/i-super-user/:id",(req,res)=>{
    console.log("In update function!!");
    let id = req.params.id;
    // console.log(s)
    
    let ans = req.body.id;
    console.log(ans);
    console.log(id);
    question.updateOne(
        {_id:id},
        {
            answer:ans
        },
        function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully Updated to db!!");
            }
        }
    )
    res.redirect(307, "/i-super-user");
});



app.post("/blog_admin", (req, res) => {
    console.log("User-Name:", req.body.email);
    console.log("Password:", req.body.password);
    let user_name = req.body.email;
    let password = req.body.password;
    if (user_name == "shivanshgoel21@gmail.com" && password == "shivansh") {
        res.redirect(307, "/i-super-user");
    }
    else {
        console.log("Invalid Entry!!");
    }
});


var PORT=process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server Running on Port 3000");
});