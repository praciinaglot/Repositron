const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function runCline(prompt, cwd) {
  // Dynamic analysis
  return new Promise((resolve) => {
    console.log("Analyzing repo at:", cwd);
    const files = [];
    const commands = { install: null, test: null, start: null };
    const allDeps = [];

    // Walk the repo directory
    function walk(dir, rel = '') {
      const items = fs.readdirSync(path.join(cwd, rel));
      for (const item of items) {
        const itemPath = path.join(rel, item);
        const fullPath = path.join(cwd, itemPath);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walk(dir, itemPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          let language = 'Text';
          if (['.js', '.ts', '.jsx', '.tsx'].includes(ext)) language = 'JavaScript';
          else if (['.py'].includes(ext)) language = 'Python';
          else if (['.java'].includes(ext)) language = 'Java';
          else if (['.md'].includes(ext)) language = 'Markdown';
          else if (['.json'].includes(ext)) language = 'JSON';
          else if (['.html'].includes(ext)) language = 'HTML';
          else if (['.css'].includes(ext)) language = 'CSS';
          else if (['.sol'].includes(ext)) language= 'Solidity';
          else if (['.rs'].includes(ext)) language= 'Rust';

          const dependencies = [];
          if (item === 'package.json') {
            try {
              const pkg = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
              if (pkg.dependencies) {
                Object.keys(pkg.dependencies).forEach(dep => dependencies.push(dep));
              }
              commands.install = 'npm install';
              commands.test = pkg.scripts && pkg.scripts.test ? 'npm test' : null;
              commands.start = pkg.scripts && pkg.scripts.start ? 'npm start' : null;
            } catch {}
          } else if (item === 'requirements.txt') {
            try {
              const reqs = fs.readFileSync(fullPath, 'utf8').split('\n').filter(line => line.trim());
              reqs.forEach(line => {
                const dep = line.split('==')[0].trim();
                if (dep) dependencies.push(dep);
              });
              commands.install = 'pip install -r requirements.txt';
            } catch {}
          }

          files.push({ path: itemPath, language, dependencies });
          console.log("File:", itemPath, language, "Deps:", dependencies);
        }
      }
    }

    walk(cwd);

    console.log("Found files:", files.length);

    // Default commands if not set
    if (!commands.install && files.some(f => f.language === 'Python')) {
      commands.install = 'pip install -r requirements.txt'; // assume
    }
    if (!commands.start && files.some(f => f.language === 'Python')) {
      const pyFiles = files.filter(f => f.language === 'Python');
      if (pyFiles.length > 0) commands.start = `python ${pyFiles[0].path}`;
    }

    const output = JSON.stringify({ files, commands });
    resolve(output);
  });
}

function extractJSON(output) {
  const first = output.indexOf("{");
  const last = output.lastIndexOf("}");
  if (first === -1 || last === -1) return null;

  try {
    return JSON.parse(output.slice(first, last + 1));
  } catch {
    return null;
  }
}

exports.analyzeRepo = async (repoPath) => {
  const prompt = `
You are a STRICT JSON generator.

Rules:
- Output ONLY JSON
- No markdown
- No explanation
- No comments

Analyze the repository at path: ${repoPath}

Return JSON in this schema:

{
  "structure": {},
  "languages": [],
  "dependencies": [],
  "commands": {
    "install": null,
    "test": null,
    "start": null
  },
  "appType": null,
  "defaultUrl": null
}

[
  {"path": "src/main.js", "language": "JavaScript", "dependencies": ["express", "mongoose"]},
  {"path": "package.json", "language": "JSON", "dependencies": []}
]

`;

  const output = await runCline(prompt, repoPath);
  const summary = extractJSON(output);

  if (!summary) {
    console.error("❌ Raw Cline output:\n", output);
    throw new Error("Cline did not return valid JSON");
  }

  fs.writeFileSync(
    path.join(process.cwd(), "repo_summary.json"),
    JSON.stringify(summary, null, 2)
  );

  return summary;
};
