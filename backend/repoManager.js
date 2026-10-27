const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.cloneRepo = (repoUrl) => {
  return new Promise((resolve) => {
    const repoName = repoUrl.split("/").pop().replace(".git", "");
    const repoPath = path.join(__dirname, "repos", repoName);

    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, { recursive: true, force: true });
    }

    console.log("📥 Cloning:", repoUrl);

    exec(`git clone ${repoUrl} ${repoPath}`, () => {
      resolve(repoPath);
    });
  });
};
