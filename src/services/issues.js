import axios from "axios";

const bearerToken = process.env.REACT_APP_GITHUB_BEARER_TOKEN;

const headers = {
  Accept: "application/vnd.github.v3+json",
};

if (bearerToken) headers.Authorization = `Bearer ${bearerToken}`;

const api = axios.create({
  baseURL: "https://api.github.com",
  headers,
  timeout: 10000,
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
    return [];
  }
};

export const searchIssues = async (text) => {
  console.log("Searching issues...");
  const terms = [`repo:${repo}`];
  if (text) terms.push(text.trim());
  try {
    const response = await api.get(`search/issues`, {
      params: {
        q: terms.join(" "),
      },
    });
    const issues = response.data.items;
    return issues;
  } catch (error) {
    console.error(error);
    return [];
  }
};
