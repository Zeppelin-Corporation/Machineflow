// create_issue.js
// ===========================================================================
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ===========================================================================
// Description: Node.js script to create a GitHub issue for Machineflow using 
//              the GitHub API. Assigns team members and logs the result.
// Created: March 15, 2025
// Repository: Machineflow (github.com/Zeppelin-Corporation/machineflow)
// ===========================================================================

const { Octokit } = require("@octokit/rest");
require("dotenv").config(); // Load environment variables from .env

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set in environment or .env
const OWNER = "yourusername"; // Replace with your GitHub username
const REPO = "machineflow";

// Initialize Octokit with authentication
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Function to create an issue
async function createIssue(title, body, assignees = [], labels = []) {
  try {
    const response = await octokit.issues.create({
      owner: OWNER,
      repo: REPO,
      title: title,
      body: body,
      assignees: assignees, // Array of GitHub usernames
      labels: labels,       // Array of label names
    });

    console.log(`Issue created successfully: ${response.data.html_url}`);
    return response.data;
  } catch (error) {
    console.error("Error creating issue:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
}

// Example usage
async function main() {
  const issueTitle = "Workflow Failure: CFF Conversion";
  const issueBody = `
    A workflow in Machineflow failed to run. Please investigate:
    - **Workflow**: cffconvert.yml
    - **Date**: ${new Date().toISOString()}
    - **Details**: Check the Actions tab for logs.
    - **Assignees**: Core team to debug and resolve.
  `;
  const assignees = ["tilakrayal", "Venkat6871"]; // From your snippet
  const labels = ["bug", "automation"];

  try {
    await createIssue(issueTitle, issueBody, assignees, labels);
  } catch (error) {
    process.exit(1); // Exit with error code
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createIssue }; // Export for use in other scripts
