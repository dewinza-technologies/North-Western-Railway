const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "nwr-secret-key";

/* users */
const users = [
  {
    id: 1,
    userId: "admin",
    password: "1234",
    name: "Railway Admin"
  },
  {
    id: 2,
    userId: "officer",
    password: "1234",
    name: "Railway Officer"
  }
];

/* database */
let projects = [];


/* LOGIN */
app.post("/login", (req, res) => {

  const { userId, password } = req.body;

  const user = users.find(
    u => u.userId === userId && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    { id: user.id },
    SECRET
  );

  res.json({ token, user });
});


/* GET PROJECTS */
app.get("/projects", (req, res) => {
  res.json(projects);
});


/* CREATE PROJECT */
app.post("/projects", (req, res) => {

  const project = {
    id: Date.now(),
    ...req.body,
    status: "Pending",
    progress: 0,
    remarks: ""
  };

  projects.push(project);

  res.json(project);
});


/* UPDATE PROJECT (SAFE MERGE) */
app.put("/projects/:id", (req, res) => {

  const id = Number(req.params.id);

  const project = projects.find(
    p => p.id === id
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  // merge update (IMPORTANT)
  if (req.body.status !== undefined) {
    project.status = req.body.status;
  }

  if (req.body.progress !== undefined) {
    project.progress = req.body.progress;
  }

  if (req.body.remarks !== undefined) {
    project.remarks = req.body.remarks;
  }

  res.json(project);
});


/* DELETE */
app.delete("/projects/:id", (req, res) => {

  const id = Number(req.params.id);

  projects = projects.filter(
    p => p.id !== id
  );

  res.json({ success: true });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});