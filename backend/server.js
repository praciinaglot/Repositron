const express = require("express");
const cors = require("cors");
const { cloneRepo } = require("./repoManager");
const { analyzeRepo } = require("./analyzer");
const { runClineCommand } = require("./runner");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "https://repositronfrontend-2h2laeos4-yogitas-projects-f217441b.vercel.app"
}));


app.use(express.json());

// Store active runs
const activeRuns = new Map();

// Pipeline start endpoint
app.post("/api/pipeline/start", async (req, res) => {
  try {
    const { repoUrl, mode } = req.body;
    
    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL is required" });
    }

    const runId = Date.now().toString();
    activeRuns.set(runId, { status: "running", mode, repoUrl });

    // Start the pipeline asynchronously
    (async () => {
      try {
        console.log(`🚀 Starting pipeline for: ${repoUrl}`);
        
        // 1️⃣ Clone
        const repoPath = await cloneRepo(repoUrl);
        
        // 2️⃣ Analyze & summarize
        const metadata = await analyzeRepo(repoPath);
        
        // Save metadata for frontend access
        fs.writeFileSync(
          path.join(__dirname, "repo_summary.json"),
          JSON.stringify(metadata, null, 2)
        );
        
        console.log("\n📄 repo_summary.json generated\n");
        
        if (mode === "analyze-setup") {
          // 3️⃣ Install dependencies
          if (metadata.commands && metadata.commands.install) {
            await runClineCommand(
              metadata.commands.install,
              repoPath,
              metadata
            );
          }
          
          // 4️⃣ Run tests
          if (metadata.commands && metadata.commands.test) {
            await runClineCommand(
              metadata.commands.test,
              repoPath,
              metadata
            );
          }
          
          // 5️⃣ Run project
          if (metadata.commands && metadata.commands.start) {
            await runClineCommand(
              metadata.commands.start,
              repoPath,
              metadata
            );
          }
        }
        
        activeRuns.set(runId, { 
          status: "completed", 
          mode, 
          repoUrl,
          metadata 
        });
        
        console.log("\n🎉 Pipeline completed!");
        
      } catch (error) {
        console.error("Pipeline failed:", error);
        activeRuns.set(runId, { 
          status: "failed", 
          mode, 
          repoUrl,
          error: error.message 
        });
      }
    })();

    res.json({ 
      runId, 
      message: "Pipeline started successfully",
      status: "running"
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get pipeline status (query parameter format)
app.get("/api/pipeline/status", (req, res) => {
  const { runId } = req.query;
  const run = activeRuns.get(runId);
  
  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }
  
  res.json(run);
});

// Get repository summary
app.get("/api/repo/summary", (req, res) => {
  try {
    const summaryPath = path.join(__dirname, "repo_summary.json");
    if (fs.existsSync(summaryPath)) {
      const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
      res.json(summary);
    } else {
      res.status(404).json({ error: "No repository summary found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST /api/pipeline/start`);
  console.log(`   GET  /api/pipeline/status?runId=:runId`);
  console.log(`   GET  /api/repo/summary`);
});
