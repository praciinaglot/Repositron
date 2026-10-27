function execCline(prompt, cwd) {
  return new Promise((resolve) => {
    console.log("\n🧠 Cline:\n", prompt);

    const mockOutput = "Command executed successfully.";
    console.log(mockOutput);
    resolve(mockOutput);
  });
}

function hasError(output) {
  return (
    output.includes("Error") ||
    output.includes("ERR!") ||
    output.includes("failed") ||
    output.includes("Traceback")
  );
}

exports.runClineCommand = async (command, repoPath, metadata) => {
  const output = await execCline(
    `Run this command:\n${command}`,
    repoPath
  );

  if (hasError(output)) {
    console.log("❗ Error detected, asking Cline to fix...");

    await execCline(
      `The command "${command}" failed.
Fix the issue in this project and rerun it.`,
      repoPath
    );
  }

  if (metadata.appType === "web" && metadata.defaultUrl) {
    await execCline(
      `Open ${metadata.defaultUrl} in the browser`,
      repoPath
    );
  }
};
