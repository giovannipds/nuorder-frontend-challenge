import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AsyncSelect from "react-select/async";
import { searchIssues } from "./services/issues";
import debounce from "lodash.debounce";
import Color from "color";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [issue, setIssue] = useState("");
  const delay = 500;

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      getOptions(inputValue).then((options) => callback(options));
    }, delay),
    []
  );

  const getOptions = async (inputValue) => {
    const issues = await searchIssues(inputValue);
    const options = issues.map((issue) => {
      const { html_url, id, labels, number, title } = issue;
      return { html_url, issueLabels: labels, label: title, number, value: id };
    });
    return options;
  };

  const handleInputChange = (newValue) => setSearchTerm(newValue);

  const handleChange = (issueOption) => {
    setIssue(issueOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: 16,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "calc(35vh);",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "left",
    }),
  };

  const formatOptionLabel = ({ issueLabels, label }) => (
    <div>
      <span className="Option-label">{label}</span>
      {issueLabels.map((item, key) => {
        const { color, description, name } = item;
        const backgroundColor = `#${color}`;
        const textColor = Color(backgroundColor).isDark() ? "#fff" : "#000";
        return (
          <small
            className="Issue-label"
            key={key}
            style={{ backgroundColor, color: textColor }}
            title={description}
          >
            {name}
          </small>
        );
      })}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-logo"
          href="https://nu.nuorder.com/index.html"
          rel="noopener noreferrer"
          target="_blank"
          title="Go to nuorder.com"
        >
          <img src={logo} alt="NuORDER" />
        </a>
      </header>
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
          formatOptionLabel={formatOptionLabel}
          loadingMessage={() => "Wait, loading..."}
          loadOptions={loadOptions}
          // menuIsOpen={searchTerm}
          onChange={handleChange}
          noOptionsMessage={() => (searchTerm ? "Nothing" : "Type anything")}
          onInputChange={handleInputChange}
          placeholder="Search"
          styles={customStyles}
        />
      </span>
      {issue && (
        <div className="Button-container">
          <a
            className="Button"
            href={issue.html_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to Issue #{issue.number}
          </a>
        </div>
      )}
      <footer className="Footer">
        <a
          className="App-link"
          href="https://github.com/giovannipds"
          target="_blank"
          rel="noopener noreferrer"
          title="See dev's GitHub"
        >
          <span aria-label="With love" role="img">
            ❤️
          </span>{" "}
          <span className="App-link-label">Giovanni Pires</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
