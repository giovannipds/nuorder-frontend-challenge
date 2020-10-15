import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
  timeout: 3000,
});

const repo = "facebook/react";

export const getIssues = async () => {
  console.log("Getting issues...");
  try {
    const response = await api.get(`repos/${repo}/issues`);
    const issues = response.data;
    return issues;
  } catch (error) {
    console.error(error);
  }
};

export const searchIssues = async (text) => {
  console.log("Searching issues...");
  try {
    const terms = [`repo:${repo}`];
    if (text) terms.push(text);
    const response = await api.get(`search/issues`, {
      params: {
        q: terms.join(" "),
      },
    });
    const issues = response.data.items;
    return issues;
  } catch (error) {
    console.error(error);
  }
};
