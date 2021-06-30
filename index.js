const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const port = 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.listen(process.env.PORT || port, () => {
    console.log("We are live on port 4444");
});

app.get("/", (req, res) => {
    res.send("Welcome to my mail api");
});

app.post("/api/v1", (req, res) => {
    let data = req.body;

    let smtpTransport = nodemailer.createTransport({
        service: "hotmail",
        auth: {
        user: "michaelsavage119@hotmail.com",
        pass: "03F12qlZ",
        },
    });

    let mailOptions = {
        from: data.email,
        to: "michaelsavage119@hotmail.com@gmail.com",
        subject: `${data.subject}`,
        html: `<p>${data.name}</p>
            <p>${data.email}</p>
            <p>${data.message}</p>`,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send("Success");
        }
        smtpTransport.close();
    });
});
