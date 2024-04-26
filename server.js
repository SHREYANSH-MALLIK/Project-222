const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port : 465,
    host : "smtp.gmail.com",
    auth : {
        user : "shreyanshmallik@gmail.com",
        pass : "urks tpdp yytk tcdw"
    },
    secure : true
})

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const name = req.body.name

    const mailData = {
        from: "",
        to: to,
        subject: "Your payment is due!",
        html: ` <p>
                    Hello ${name},
                </p>
                <p>
                    This is a reminder email that your payment of amount - ${amount} is due on date - ${date}
                </p>
                <p>
                    Kindly make the payment before the due date to avoid any inconvenience.
                </p>
                <p>
                    Thanks and Regards,
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            res.status(200).send({ message: "Invitation sent!", message_id: info.messageId });}
    });
})

server.listen(process.env.PORT || 3030);