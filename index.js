const express = require('express')
const mongoose = require("mongoose")
const connection = require("./app/config/db")
const nodemailer = require('nodemailer')
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



const gallery = mongoose.model('gallery', { embedCode: String, email: String, socialMedia: Object, author: String, galleryname: String });

const laptop = mongoose.model('laptop', { model: String, link: String, imageLink: String, description:String, price: String });


/////////////// only static routes////////////////////////////

app.get("/", (req, res) => {
    res.render('index');
});


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
