import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          href="https://nu.nuorder.com/index.html"
          target="_blank"
          title="Go to nuorder.com"
        >
          <img src={logo} className="App-logo" alt="NuORDER" />
        </a>
        <p>Lorem ipsum dolor sit amet</p>
        <a
          className="App-link"
          href="https://github.com/giovannipds"
          target="_blank"
          rel="noopener noreferrer"
          title="See candidate's GitHub"
        >
          Giovanni Pires
        </a>
      </header>
    </div>
  );
}

export default App;
