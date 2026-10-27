
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.cloneRepo = (repoUrl) => {
  return new Promise((resolve, reject) => {
    const repoName = repoUrl
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .replace(/\.git$/, "");

    const repoPath = path.join(
      __dirname,
      "repos",
      repoName
    );

    fs.mkdirSync(path.dirname(repoPath), {
      recursive: true,
    });

    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, {
        recursive: true,
        force: true,
      });
    }

    console.log("Cloning:", repoUrl);

    exec(
      `git clone ${JSON.stringify(repoUrl)} ${JSON.stringify(repoPath)}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Clone failed:", stderr || error.message);
          return reject(
            new Error(stderr || error.message)
          );
        }

        console.log("Repository cloned:", repoPath);
        resolve(repoPath);
      }
    );
  });
};
