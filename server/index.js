const express = require("express");
const app = express();
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
  res.send("<h1>Sup Bitches, tis the API homepage</h1>");
});
//Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
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
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
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
  console.log("server is running on port 5000");
});
