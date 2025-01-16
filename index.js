import express, { response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/users", async (req, res) => {
//     const [result, fields] = await connection.query("SELECT * FROM user");
//     res.json(result);
// });

// app.get("/user/:id", async (req, res) => {
//     const id = Number(req.params.id);
//     if (!isNaN(id)) {
//         try {
//             const [result] = await connection.query(
//                 "SELECT * FROM user WHERE id=?",
//                 [id]
//             );
//             if (result.length) {
//                 res.json(result);
//             } else {
//                 res.send("no user found");
//             }
//         } catch (e) {
//             res.status(500).send("Something went wrong");
//         }
//     } else {
//         res.status(400).send("ID is not a valid number");
//     }
// });
// app.post("/post", async (req, res) => {
//     const { id, title, content } = req.body;

//     const [result] = await connection.query(`
//     INSERT INTO post(title, content, user_id)
//     VALUES('${title}','${content}', ${id});
//     `);

//     res.json(result);
// });

// app.get("/query", (req, res) => {
//     res.send(req.query);
// });
// app.get("/post", async (req, res) => {
//     const [result] = await connection.query(`
//         SELECT * FROM post
//         `);
//     res.json(result);
// });

// app.get("/test", async (req, res) => {
//     const sort = req.query.sort || "id";
//     const sortOrder = req.query.sortOrder || "ASC";

//     const [result] = await connection.query(
//         `SELECT * FROM test ORDER BY ${sort} ${sortOrder}`
//     );
//     res.json(result);
// });

// app.get("/test/:id", async (req, res) => {
//     const { id } = req.params;
//     const [result] = await connection.query(
//         "SELECT * FROM test WHERE id=" + id
//     );
//     res.json(result);
// });

// app.post("/test", async (req, res) => {
//     const { content } = req.body;

//     const [result] = await connection.query(
//         `
//     INSERT INTO test(content)
//     VALUES (?);`,
//         [content]
//     );

//     res.send("success");
// });

// app.listen(port, () => {
//     console.log("Server started on port:", port);
// });

// sort
app.get("/blog", async (req, res) => {
    const sort = req.query.sort || "id";
    const sortOrder = req.query.sortOrder || "ASC";

    const [result] = await connection.query(
        `SELECT * FROM blog ORDER BY ${sort} ${sortOrder}`
    );
    res.json(result);
});

// get by id
app.get("/blog/:id", async (req, res) => {
    const id = Number(req.params.id);
    const [result] = await connection.query(
        `SELECT * FROM blog WHERE id=${id}`
    );
    res.json(result);
});

// get all blog
app.get("/blog", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM blog
        `);
    res.json(result);
});

// post content
app.post("/blog", async (req, res) => {
    const { title, content, imageUrl } = req.body;

    try {
        const [result] = await connection.query(
            `
            INSERT INTO blog (title, content, imageUrl)
            VALUES (?, ?, ?);
            `,
            [title, content, imageUrl]
        );

        res.status(201).send({
            message: "Blog post created successfully",
        });
    } catch (error) {
        console.error("Error", error);
    }
});

// post comments
app.post("/blog", async (req, res) => {
    const { comments } = req.body;

    const [result] = await connection.query(
        `
    INSERT INTO blog(comments)
    VALUES (?);`,
        [comments]
    );

    res.send("comment success");
});

app.delete("/blog/", async (req, res) => {
    const id = Number(req.params.id);
    const [result] = await connection.query(`DELETE FROM blog WHERE id=${id}`);
    res.json(result);
});

app.listen(port, () => {
    console.log("Server started on port:", port);
});
