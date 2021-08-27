require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

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
        subject: `THATSSAVAGE.IE Message: ${req.body.email}`,
        text: `From ${req.body.email},\n\n${req.body.message}\n\n${req.body.name}`
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