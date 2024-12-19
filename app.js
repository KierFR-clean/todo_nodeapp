const express = require("express");
const path = require("path");
//parse request bodies
const bodyParser = require("body-parser");
const app = express();
//parse by json
app.use(bodyParser.json());
//from public
app.use(express.static("public"));
//storage
let todotask = [];
//delete
app.delete("/api/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  todotask = todotask.filter((task) => task.id !== taskId);
  res.status(204).send();
});
//get post endpoint
app.post("/api/task", (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
    createdAt: new Date(),
  };
  todotask.push(task);
  res.status(201).json(task);
});
//get endpoint
app.get("/api/task", (req, res) => {
  res.json(todotask);
});

//update
app.put("/api/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = todotask.findIndex((task) => task.id === taskId);
  const nonNegative = taskIndex > -1;

  if (nonNegative) {
    todotask[taskIndex] = { ...todotask[taskIndex], ...req.body };
    res.json(todotask[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
