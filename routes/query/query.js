const express = require('express')
const query = express.Router()
const question = require('../../app/models/question')

query.use(function timeLog(req, res, next) {
    console.log('query Time: ', Date.now())
    next()
})

query.get('/:category', async (req, res, next) => {

    try {

        if (!req.params.category) throw new Error('Required Parameter Not Found!!')

        let filtered = await question.find({ category: { $in: [req.params.category] } })
        res.render("answers", { answers: filtered.reverse() });

    } catch (err) {
        next(err)
    }
})

query.get('/:id', async (req, res, next) => {

    try {

        if (!req.params.id) throw new Error('Required Parameter Not Found!!')

        let question = await question.find({ _id: req.params.id });
        res.render("seequestion", { showme: question });

    } catch (err) {
        next(err)
    }

})

query.post("/new", async (req, res, next) => {
    try {
        console.log('Request Body ', req.body)
        if(!req.body.question_area || !req.body.query_email || !req.body.categories) throw new Error('Bad Request!!')

        let cat = req.body.categories
 
        const newQuestion = new question({ question: req.body.question_area, category: cat, email: req.body.query_email });
        await newQuestion.save()

        // /////////// mailing option //////////////////
        // let mailOptions = {
        //     from: 'vhelp55@gmail.com',
        //     to: 'vhelp55@gmail.com',
        //     subject: 'Got a new query!!',
        //     text: `Hey, we got a new query: ${ques}`,
        //     html: `<p><br> Answer a new question <a href=https://vhelp.herokuapp.com/see/${question_id}>Click Here</a>!!</p>`
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        // ///////////////// mailing option ends /////////////////

        // // question.find(function (err, data) {
        // //     if (err) {
        // //         console.log(error);
        // //     }
        // //     else {
        // //         console.log(data);
        // //     }
        // // });
        // res.redirect('/?stat=posted');

        res.json(newQuestion)

    } catch (err) {
        next(err)
    }
})

query.post("/:id", async (req, res, next) => {
    let questionn_id = req.params.id;

    try {

        if (!req.params.id || !req.body.campus_name
            || !req.body.ans_here
            || !req.body.name_first
            || !req.body.imp_link
            || !req.body.insta_handle
        ) throw new Error('Bad Request!!')

        let new_ans = {
            campus: req.body.campus_name,
            ans: req.body.ans_here,
            name: req.body.name_first + " ",
            link: req.body.imp_link,
            insta: req.body.insta_handle
        };
        let querer_info = await question.findOneAndUpdate({ _id: req.params.id },
            { $addToSet: { answer: new_ans } },
            function (err) {
                if (err) next(err);
            });

        // TODO
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

    } catch (err) {
        next(err)
    }


});

module.exports = query