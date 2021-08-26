require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
var cors = require('cors');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(cors());
app.use(allowCrossDomain);
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.live.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Message on thatssavage.ie: ${req.body.email}`,
        text: req.body.message + ",\n" + req.body.name 
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log("Error sending Email..");
            res.send("error");
        } else {
            console.log("Email Sent!");
            res.send("success");
        }
    });
});