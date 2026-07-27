const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Samuel@2404",
    database: "wandernest"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/contact", (req, res) => {

    const { name, email, destination, message } = req.body;

    const sql = `
        INSERT INTO contacts
        (name,email,destination,message)
        VALUES (?,?,?,?)
    `;

    db.query(sql,
        [name, email, destination, message],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false
                });
            }

            res.json({
                success: true,
                message: "Message Sent Successfully"
            });

        });

});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});