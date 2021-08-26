require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

var cors = require('cors');
app.use(cors());
app.use(express.json());

var allowlist = ['http://localhost:3000/','https://thatssavage.ie/']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", cors(corsOptionsDelegate), async (req, res) => {
    console.log(req.body.name);
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
            res.send("error");
        } else {
            console.log("Email Sent!");
            res.send("success");
        }
    });
});