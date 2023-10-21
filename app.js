const express = require('express');
const app = express();
const port = 3000;
const database = require("./db/mySql");
app.use(express.json());

// --------------- in mysql read data from database ------------------------------
app.get('/', (req, res) => {
    database.query("SELECT * FROM students", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

// --------- insert new data in dataBase --------
app.post("/", (req, res) => {
    const newData = req.body;
    database.query("INSERT INTO students SET ?", newData, (err, result, fields) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// --------- update data in dataBase --------
app.put("/:id", (req, res) => {
    // static data
    // const data = ["sahil", "sahil9664@gmail.com", 34, 6];

    // daynamic data
    const data = [req.body.Name, req.body.Email, req.body.age, req.params.id];

    database.query("UPDATE students SET Name = ?, Email = ?, age = ? where id = ?", data, (err, result, field) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// --------- Delete data in dataBase --------
app.delete("/:id", (req, res) => {
    database.query("DELETE FROM students WHERE id = ?", + req.params.id, (err, result) => {
        if (err) {
            throw new Error(err);
        } else {
            res.send("data deleted successfully", req.params.id, result);
        }
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})