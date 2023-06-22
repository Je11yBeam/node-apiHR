const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "157.245.59.56",
  user: "u6400898",
  password: "6400898",
  database: "u6400898_hrsensor",
  port: 3366,
});

var app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({
    status: "ok",
    message: "Hello World",
  });
});

app.get("/getrate", function (req, res) {
  connection.query("SELECT * FROM hrTest", function (err, results) {
    console.log(results); //แสดงผลที่ console
    res.json(results); //ตอบกลับ request
  });
});

// app.get("/pets", function (req, res) {
//   connection.query(
//     `INSERT INTO heartrate;`,
//     function (err, results) {
//       res.json(results);
//     }
//   );
// });

app.post("/getrate", function (req, res) {
  const h_data = req.body.h_data;
  connection.query(
    `INSERT INTO hrTest (heartrate) VALUES (?)`,
    [h_data],
    function (err, results) {
      if (err) {
        res.json(err);
      }
      res.json(results);
    }
  );
});

app.get("/getrate_chart", function (req, res) {
  connection.query(
    `SELECT *
     FROM hrTest`,
    function (err, results) {
      const time = [];
      const heartrate = [];
      for (let i = 0; i < results.length; i++) {
        time.push(results[i]["Time"]);
        heartrate.push(parseFloat(results[i]["Heartrate"]));
      }
      res.json({
        time,
        heartrate,
      });
    }
  );
});

// app.get("/pets_price", function (req, res) {
//   connection.query(
//     `SELECT id, petName, price
//      FROM pet
//      ORDER BY price;`,
//     function (err, results) {
//       res.json(results);
//     }
//   );
// });

// app.get("/pets_price_chart", function (req, res) {
//   connection.query(
//     `SELECT id, petName, price
//      FROM pet
//      ORDER BY price;`,
//     function (err, results) {
//       const petNames = [];
//       const prices = [];
//       for (let i = 0; i < results.length; i++) {
//         petNames.push(results[i]["petName"]);
//         prices.push(parseFloat(results[i]["price"]));
//       }
//       res.json({
//         petNames,
//         prices,
//       });
//     }
//   );
// });

app.listen(5000, () => {
  console.log("Server is started.");
});
