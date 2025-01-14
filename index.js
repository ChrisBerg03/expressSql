import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    database: "sql7757373",
    user: "sql7757373",
    password: "xPa439Ai7l",
    port: 3306,
});

const app = express();

let count = 0;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    count++;
    console.log(count);
    next();
});

app.get("/", async (req, res) => {
    const [result, fields] = await connection.query("SELECT * FROM user");
    res.send(result);
});

app.get("/user/:id", (req, res) => {
    console.log(req.params.id);
    res.send(req.params.id);
});

app.listen(3000, () => {
    console.log("Server started");
});

const query = "url.com?query=hello";
const param = "url.com/param";
