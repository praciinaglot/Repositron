
const fs = require("fs");
const path = require("path");

exports.analyzeRepo = async (repoPath) => {
  const files = [];
  const commands = {
    install: null,
    test: null,
    start: null,
  };
  const dependencies = new Set();
  const languages = new Set();

  const ignoredDirs = new Set([
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
  ]);

  function walk(dir, relativeDir = "") {
    const entries = fs.readdirSync(dir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (entry.name.startsWith(".") ||
          ignoredDirs.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const relativePath = path
        .join(relativeDir, entry.name)
        .replace(/\\/g, "/");

      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
        continue;
      }

      if (!entry.isFile()) continue;

      const ext = path.extname(entry.name).toLowerCase();
      let language = "Text";

      const languageMap = {
        ".js": "JavaScript",
        ".jsx": "JavaScript",
        ".ts": "TypeScript",
        ".tsx": "TypeScript",
        ".py": "Python",
        ".java": "Java",
        ".md": "Markdown",
        ".json": "JSON",
        ".html": "HTML",
        ".css": "CSS",
        ".sol": "Solidity",
        ".rs": "Rust",
        ".go": "Go",
        ".c": "C",
        ".cpp": "C++",
      };

      language = languageMap[ext] || language;
      const fileDependencies = [];

      if (entry.name === "package.json") {
        try {
          const pkg = JSON.parse(
            fs.readFileSync(fullPath, "utf8")
          );

          for (const dep of Object.keys({
            ...pkg.dependencies,
            ...pkg.devDependencies,
          })) {
            fileDependencies.push(dep);
            dependencies.add(dep);
          }

          if (pkg.scripts?.test) {
            commands.test = "npm test";
          }

          if (pkg.scripts?.start) {
            commands.start = "npm start";
          } else if (pkg.scripts?.dev) {
            commands.start = "npm run dev";
          }

          commands.install = "npm install";
        } catch (error) {
          console.error("Could not parse package.json:", error.message);
        }
      }

      if (entry.name === "requirements.txt") {
        const requirements = fs
          .readFileSync(fullPath, "utf8")
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith("#"));

        for (const requirement of requirements) {
          const dep = requirement.split(/[<=>~!]/)[0].trim();
          if (dep) {
            fileDependencies.push(dep);
            dependencies.add(dep);
          }
        }

        commands.install = "pip install -r requirements.txt";
      }

      files.push({
        path: relativePath,
        language,
        dependencies: fileDependencies,
      });

      if (!["Text", "JSON", "Markdown"].includes(language)) {
        languages.add(language);
      }
    }
  }

  if (!fs.existsSync(repoPath)) {
    throw new Error(`Repository path does not exist: ${repoPath}`);
  }

  walk(repoPath);

  const summary = {
    files,
    languages: [...languages],
    dependencies: [...dependencies],
    commands,
  };

  console.log(`Analysis complete: ${files.length} files found`);

  return summary;
};
