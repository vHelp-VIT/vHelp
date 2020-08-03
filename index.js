const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const mongoose = require("mongoose")
var nodemailer = require('nodemailer');
const app = express()
app.use(bodyparser.urlencoded({ extended: true }));



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vhelp55@gmail.com',
        pass: 'shivansh12'
    }
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


var mongo = async () => {
    // mongoose.connect("mongodb://localhost:27017/vhelpblog", { useNewUrlParser: true });
    await mongoose.connect("mongodb+srv://shivansh-12:shivansh@cluster0.vvpfe.mongodb.net/vHelp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
};
mongo()

const question = mongoose.model('question', { question: String, category: Object, answer: Object, email: String });


app.get("/", (req, res) => {
    if (req.query.stat == "posted") res.render('index', { foo: 1 });
    else res.render('index', { foo: 0 });
});


app.post("/", (req, res) => {
    // console.log("Question posted!!");

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
        if (cat.length == 0) {
            cat.push("general")
        }
        return cat
    }
    let ques = req.body.question_area;
    let query_email = req.body.query_email;

    if (ques.length != undefined) {
        let cat = categories();
        const newQuestion = new question({ question: ques, category: cat, answer: [], email: query_email });
        newQuestion.save()
    }
    question.find(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    });
    res.redirect('/?stat=posted');
});


app.get("/:cat", async (req, res) => {
    let required_category = req.params.cat;
    let filtered = await question.find({ category: { $in: [required_category] } })
    res.render("answers", { answers: filtered.reverse() });

});

app.get("/see/:id",async(req,res)=>{
    let questionn_id=req.params.id;
    console.log(questionn_id);
    let send_show_me = await question.find({ _id: questionn_id });
    // console.log("Show me is:", show_me);
    res.render("seequestion",{show_me: send_show_me});
});


app.post("/update_ans/:ans_id", async (req, res) => {
    let questionn_id = req.params.ans_id;
    let my_new_ans = req.body.ans_here;
    let campus = req.body.campus_name;
    let name = req.body.name_first + " " + req.body.name_last;
    let link = req.body.imp_link;
    let new_ans = {
        campus: campus,
        ans: my_new_ans,
        name: name,
        link: link
    };
    let querer_info = await question.findOneAndUpdate({ _id: questionn_id },
        { $addToSet: { answer: new_ans } },
        function (err) {
            if (err) console.log(err);
            else console.log("Updated ans successfully!!");
        });
    let mail_to = querer_info.email;
    console.log("Mail to: " + mail_to);
    if (mail_to != undefined) {
        /////////// mailing option //////////////////
        let mailOptions = {
            from: 'vhelp55@gmail.com',
            to: mail_to,
            subject: 'Your query has been Answered!!',
            text: 'Check out on questionn_id ' + questionn_id,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        ///////////////// mailing option ends /////////////////
    }
    else{
        console.log("No mail id was found in database!!");
    }

    res.redirect('back');
});


////////////////////////////////////////////////////////////////////////////////////
// ///////////// all the below are admin rotes: Not working yet/////////////////////
////////////////////////////////////////////////////////////////////////////////////
app.get("/blog_admin", (req, res) => {
    res.render("admin_login");
});


app.post("/i-super-user", async (req, res) => {
    var reso;
    await question.find((err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            reso = data;
            console.log(5);
        }
    });
    // console.log(reso);
    res.render("i-super-user", { all_ques: reso });

});


// to update answer from i-super-user in database
app.post("/i-super-user/:id", async (req, res) => {
    console.log("In update function!!");
    let id = req.params.id;
    // console.log(s)

    let ans = req.body.id;
    console.log(ans);
    console.log(id);
    await question.updateOne(
        { _id: id },
        {
            answer: ans
        },
        function (err) {
            if (err) {
                console.log(err);
            }
            else {
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


var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server Running on Port 3000");
});