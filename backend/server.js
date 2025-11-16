const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Données en mémoire (simulent des pipelines Jenkins)
let pipelines = [
  {
    id: 1,
    name: "Build frontend",
    branch: "main",
    status: "SUCCESS",
    lastRun: "2025-11-15 10:30",
  },
  {
    id: 2,
    name: "Build backend",
    branch: "develop",
    status: "FAILED",
    lastRun: "2025-11-15 09:10",
  },
];

// GET – liste des pipelines
app.get("/api/pipelines", (req, res) => {
  res.json(pipelines);
});

// POST – ajouter un pipeline
app.post("/api/pipelines", (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).json({ message: "name et branch sont obligatoires" });
  }

  const newPipeline = {
    id: pipelines.length + 1,
    name,
    branch,
    status: "PENDING",
    lastRun: new Date().toLocaleString(),
  };

  pipelines.push(newPipeline);
  res.status(201).json(newPipeline);
});

// (optionnel) changer le statut d’un pipeline
app.patch("/api/pipelines/:id/status", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const pipeline = pipelines.find((p) => p.id === id);
  if (!pipeline) {
    return res.status(404).json({ message: "Pipeline introuvable" });
  }

  pipeline.status = status || pipeline.status;
  pipeline.lastRun = new Date().toLocaleString();
  res.json(pipeline);
});

app.get("/", (req, res) => {
  res.send("CI/CD backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
