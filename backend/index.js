const fs = require("fs");
const path = require("path");
const { cloneRepo } = require("./repoManager");
const { analyzeRepo } = require("./analyzer");
const { runClineCommand } = require("./runner");

async function start() {
  let repoUrl;
  if (process.argv[2]) {
    repoUrl = process.argv[2];
  } else {
    const input = JSON.parse(fs.readFileSync(path.join(__dirname, "ex.json")));
    repoUrl = input.repoUrl;
  }

  // 1️⃣ Clone
  const repoPath = await cloneRepo(repoUrl);

  // 2️⃣ Analyze & summarize
  const metadata = await analyzeRepo(repoPath);

  fs.writeFileSync(
    "repo_summary.json",
    JSON.stringify(metadata, null, 2)
  );

  console.log("\n📄 repo_summary.json generated\n");

  // 3️⃣ Install dependencies
  if (metadata.commands.install) {
    await runClineCommand(
      metadata.commands.install,
      repoPath,
      metadata
    );
  }

  // 4️⃣ Run tests
  if (metadata.commands.test) {
    await runClineCommand(
      metadata.commands.test,
      repoPath,
      metadata
    );
  }

  // 5️⃣ Run project
  if (metadata.commands.start) {
    await runClineCommand(
      metadata.commands.start,
      repoPath,
      metadata
    );
  }

  console.log("\n🎉 Project setup complete!");
}

start();
