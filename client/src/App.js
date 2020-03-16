import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [chars, setChars] = useState([]);
  console.log(chars, "chars");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        console.log(res);
        setChars(res.data);
      })
      .catch(error => {
        console.log(error, "error on get api/users");
      });
  }, []);

  return (
    <div className="App">
      {chars.map(val => {
        return <h1>{val.name}</h1>;
      })}
    </div>
  );
}

export default App;
