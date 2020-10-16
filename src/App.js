import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AsyncSelect from "react-select/async";
import { searchIssues } from "./services/issues";
import debounce from "lodash.debounce";

function App() {
  const [issue, setIssue] = useState("");
  const delay = 600;

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      getOptions(inputValue).then((options) => callback(options));
    }, delay),
    []
  );

  const getOptions = async (inputValue) => {
    const issues = await searchIssues(inputValue);
    const options = issues.map((issue) => {
      return { label: issue.title, value: "" };
    });
    return options;
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setIssue(inputValue);
    return inputValue;
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
    }),
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
          Issues for{" "}
          <a
            className="App-link"
            href="https://github.com/facebook/react/issues"
            rel="noopener noreferrer"
            target="_blank"
            title="Open repo issues"
          >
            Facebook React <abbr title="repository">repo</abbr>
          </a>
          :
        </p>
        <span className="Select-container">
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            // menuIsOpen={issue}
            noOptionsMessage={() => (issue ? "Found nothing" : "Type anything")}
            onInputChange={handleInputChange}
            placeholder="Search"
            styles={customStyles}
          />
        </span>
        <small>
          <a
            className="App-link"
            href="https://github.com/giovannipds"
            target="_blank"
            rel="noopener noreferrer"
            title="See dev's GitHub"
          >
            Giovanni Pires
          </a>
        </small>
      </header>
    </div>
  );
}

export default App;
