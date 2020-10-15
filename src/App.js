import React from "react";
// import React, { Component } from 'react'
import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          href="https://nu.nuorder.com/index.html"
          rel="noopener noreferrer"
          target="_blank"
          title="Go to nuorder.com"
        >
          <img src={logo} className="App-logo" alt="NuORDER" />
        </a>
        <p>
          Search issues at{" "}
          <a
            className="App-link"
            href="https://github.com/facebook/react/issues"
            rel="noopener noreferrer"
            target="_blank"
            title="Open repository issues"
          >
            Facebook React's <abbr title="repository">repo</abbr>
          </a>
          :
        </p>
        <span className="Select-container">
          <Select options={options} placeholder="Select issue..." />
        </span>
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
