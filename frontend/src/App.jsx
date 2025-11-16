import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/hello")
      .then(res => setMsg(res.data.message))
      .catch(() => setMsg("Backend unreachable"));
  }, []);

  return (
    <div className="container">
      <h1>CI/CD Demo App</h1>
      <div className="card">
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default App;
