const express = require('express')
const mongoose = require("mongoose")
const connection = require("./app/config/db")
var nodemailer = require('nodemailer');
const app = express()
require('dotenv').config()
connection()


app.use(express.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vhelp55@gmail.com',
        pass: 'shivansh12'
    }
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
const query = require('./routes/query/query')



app.use('/query', query)


const question = mongoose.model('question', { question: String, category: Object, answer: Object, email: String });

const gallery = mongoose.model('gallery', { embedCode: String, email: String, socialMedia: Object, author: String, galleryname: String });

const laptop = mongoose.model('laptop', { model: String, link: String, imageLink: String, description:String, price: String });


app.get("/", (req, res) => {
    if (req.query.stat == "posted") res.render('index', { foo: 1 });
    else res.render('index', { foo: 0 });
});




app.post("/", (req, res) => {

    res.send("We are not recieving queries.")

    let cat = []
    categories = function () {

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
    let question_id;
    if (ques.length != undefined) {
        let cat = categories();
        const newQuestion = new question({ question: ques, category: cat, answer: [], email: query_email });
        question_id = newQuestion._id;
        newQuestion.save()
    }
    /////////// mailing option //////////////////
    let mailOptions = {
        from: 'vhelp55@gmail.com',
        to: 'vhelp55@gmail.com',
        subject: 'Got a new query!!',
        text: `Hey, we got a new query: ${ques}`,
        html: `<p><br> Answer a new question <a href=https://vhelp.herokuapp.com/see/${question_id}>Click Here</a>!!</p>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    ///////////////// mailing option ends /////////////////

    // question.find(function (err, data) {
    //     if (err) {
    //         console.log(error);
    //     }
    //     else {
    //         console.log(data);
    //     }
    // });
    res.redirect('/?stat=posted');
});


app.get("/explore/:cat", async (req, res) => {
    let required_category = req.params.cat;
    let filtered = await question.find({ category: { $in: [required_category] } })
    res.render("answers", { answers: filtered.reverse() });
});

app.get("/see/:id", async (req, res) => {
    let questionn_id = req.params.id;
    console.log(questionn_id);
    let send_show_me = await question.find({ _id: questionn_id });
    // console.log("Show me is:", show_me);
    res.render("seequestion", { showme: send_show_me });
});


app.post("/update_ans/:ans_id", async (req, res) => {
    let questionn_id = req.params.ans_id;
    let my_new_ans = req.body.ans_here;
    let campus = req.body.campus_name;
    let insta = req.body.insta_handle;
    let name = req.body.name_first + " ";
    let link = req.body.imp_link;
    let new_ans = {
        campus: campus,
        ans: my_new_ans,
        name: name,
        link: link,
        insta: insta
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
            text: 'Someone answered your query!!. Click on the below link to view ' + questionn_id,
            html: `<p>Hey,<br>Someone answered your query on vHelp. Check it immediately by <a href=https://vhelp.herokuapp.com/see/${questionn_id}>Clicking Here</a>!!</p>`
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
    else {
        console.log("No mail id was found in database!!");
    }

    res.redirect('back');
});



/////////////// only static routes////////////////////////////
app.get("/tentative", (req, res) => {
    res.render("tentative");
});
app.get("/feeCalc", (req, res) => {
    res.render("feeCalc");
});
app.get("/books", (req, res) => {
    res.render("books");
})
/////////////////// only static routes end ////////////////////////

app.get("/gallery", async (req, res) => {
    await gallery.find((err, allGalleries) => {
        if (err) console.log(err);
        else res.render("gallery", { allGalleries: allGalleries.reverse() });
    });
});

app.get("/featureGallery", async (req, res) => {
    res.render("featureGallery");
});

app.post("/featureGallery", async (req, res) => {
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let linkedin = req.body.linkedin;
    let email = req.body.email;
    let embedCode = req.body.embedCode;
    let author = req.body.author;
    let galleryname = req.body.galleryname;
    let socialMedia = {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
    }
    const newgallery = new gallery({ embedCode: embedCode, socialMedia: socialMedia, email: email, galleryname: galleryname, author: author });
    newgallery.save();
    console.log(newgallery._id);
    let gallery_id=newgallery._id;
    let mail_to=email;
    if (mail_to != undefined) {
        /////////// mailing option //////////////////
        let mailOptions = {
            from: 'vhelp55@gmail.com',
            to: mail_to,
            subject: 'Your query has been Answered!!',
            text: 'Someone answered your query!!. Click on the below link to view ' + gallery_id,
            html: `<p>Hey,<br>You started a new gallery, to update  <a href=http://localhost:3000/updateGallery/${gallery_id}>Clicking Here</a>!!</p>`
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
    res.redirect("featureGallery");
});

app.get("/updateGallery/:gallery_id", async (req, res) => {
    let galleryid = req.params.gallery_id;
    console.log(galleryid);
    gallery.findOne({ _id: galleryid }, function (err, gallerydoc) {
        if (err) console.log(err);
        else{
            console.log(gallerydoc);
            res.render("updateGallery", { galleryData: gallerydoc });
        }
    });
});

app.post("/updateGallery/:gallery_id", async (req, res) => {
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let linkedin = req.body.linkedin;
    let email = req.body.email;
    let embedCode = req.body.embedCode;
    let author = req.body.author;
    let galleryname = req.body.galleryname;
    let socialMedia = {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
    }
    let galleryid = req.params.gallery_id;
    
    gallery.findOne({ _id: galleryid }, function (err, doc) {
        doc.socialMedia = socialMedia;
        doc.email = email;
        doc.embedCode = embedCode;
        doc.author = author;
        doc.galleryname = galleryname;
        doc.save();
    });
    let mail_to=email;
    if (mail_to != undefined) {
        /////////// mailing option //////////////////
        let mailOptions = {
            from: 'vhelp55@gmail.com',
            to: mail_to,
            subject: 'Your query has been Answered!!',
            text: 'Someone answered your query!!. Click on the below link to view ' + galleryid,
            html: `<p>Hey,<br>Update your gallery <a href=http://localhost:3000/updateGallery/${galleryid}>Clicking Here</a>!!</p>`
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
    res.send("Done check your mail!!");
});



app.get("/recommendation", async(req,res)=>{
    await laptop.find((err, alllaptops) => {
        if (err) console.log(err);
        else res.render("recommendations", { laptops: alllaptops.reverse() });
    });
});



// for posting laptop recommendations

app.get("/postrecommendation", async(req,res)=>{
    res.render("postRecommendation");
});


//
app.post("/postrecommendation", async(req,res)=>{
    let model_name=req.body.model;
    let image_link=req.body.image_link;
    let site_link=req.body.site_link;
    let price=req.body.price;
    let desc=req.body.description;
    console.log(model_name)
    console.log(image_link)
    console.log(site_link)
    console.log(price)
    console.log(desc)
    let newLaptop= new laptop({model: model_name, link: site_link, imageLink: image_link, price: price, description:desc});
    newLaptop.save();
    res.redirect("/postRecommendation");
});

////////////////////////////////////////////////////////////////////////////////////
// ///////////// all the below are admin rotes: Not working yet/////////////////////
////////////////////////////////////////////////////////////////////////////////////
// app.get("/blog_admin", (req, res) => {
//     res.render("admin_login");
// });


// app.post("/i-super-user", async (req, res) => {
//     var reso;
//     await question.find((err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             reso = data;
//             console.log(5);
//         }
//     });
//     // console.log(reso);
//     res.render("i-super-user", { all_ques: reso });

// });


// // to update answer from i-super-user in database
// app.post("/i-super-user/:id", async (req, res) => {
//     console.log("In update function!!");
//     let id = req.params.id;
//     // console.log(s)

//     let ans = req.body.id;
//     console.log(ans);
//     console.log(id);
//     await question.updateOne(
//         { _id: id },
//         {
//             answer: ans
//         },
//         function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Successfully Updated to db!!");
//             }
//         }
//     )
//     res.redirect(307, "/i-super-user");
// });



// app.post("/blog_admin", (req, res) => {
//     console.log("User-Name:", req.body.email);
//     console.log("Password:", req.body.password);
//     let user_name = req.body.email;
//     let password = req.body.password;
//     if (user_name == "shivanshgoel21@gmail.com" && password == "shivansh") {
//         res.redirect(307, "/i-super-user");
//     }
//     else {
//         console.log("Invalid Entry!!");
//     }
// });


var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server Running on Port 3000");
});
