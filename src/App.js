import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AsyncSelect from "react-select/async";
import { searchIssues } from "./services/issues";

function App() {
  const loadOptions = async (inputValue, callback) => {
    const issues = await searchIssues(inputValue);
    const options = issues.map((issue) => {
      return { label: issue.title, value: "" };
    });
    callback(options);
  };

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
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            placeholder="Select issue..."
            // onInputChange={this.handleInputChange}
          />
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
