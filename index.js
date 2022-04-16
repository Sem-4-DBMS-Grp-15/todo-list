const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 5000;
//For accessing req body
app.use(express.json());

//Using db
const pool = require("./db");

//middleware
const cors = require("cors");
const { request } = require("express");
app.use(cors());

//Routes
app.get("/", async (req, res) => {
  res.send("<h1>Halo, tis the API homepage</h1>");
});

//Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Create a user
app.post("/users/signup", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await pool.query("SELECT * FROM users where uname=$1", [name]);
    if (user.rows.length > 0) {
      res.json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO users (uname, pword) VALUES ($1, $2) RETURNING *",
        [name, hashedPassword]
      );
      //Create a token
      let token;
      try {
        //Creating jwt token
        token = jwt.sign(
          { name: name, password: hashedPassword },
          config.secret,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});

//Login a user
app.post("/users/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await pool.query("SELECT * FROM users where uname=$1", [name]);
    if (user.rows.length > 0) {
      const isMatch = await bcrypt.compare(password, user.rows[0].pword);
      if (isMatch) {
        let token;
        try {
          //Creating jwt token
          token = jwt.sign({ name: name, password: password }, config.secret, {
            expiresIn: "1h",
          });
          res.json({ token });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.json({ message: "Incorrect password" });
      }
    } else {
      res.json({ message: "User does not exist" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

//Get all todos
app.get("/todos", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error! Token was not provided." });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, config.secret);
  // res.status(200).json({success:true, data:{name:decodedToken.name,password:decodedToken.password}});
  try {
    const userid = await pool.query("SELECT id FROM users WHERE uname=$1", [
      decodedToken.name
    ]);
    const allTodo = await pool.query(
      "SELECT * FROM todo where todo.uid=$1 ORDER BY id ASC",
      [userid.rows[0].id]
    );
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Create a todo
app.post("/todos", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error! Token was not provided." });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, config.secret);
  try {
    const { description } = req.body;
    const userid=await pool.query("SELECT id FROM users WHERE uname=$1",[decodedToken.name]);
    const newTodo = await pool.query(
      "INSERT INTO todo (description,uid) VALUES ($1,$2) RETURNING *",
      [description,userid.rows[0].id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    console.log("put requested");
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE id=$2 RETURNING *",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    console.log("delete requested");
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE id=$1 RETURNING *",
      [id]
    );
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
