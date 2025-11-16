const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello CI/CD from backend!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
