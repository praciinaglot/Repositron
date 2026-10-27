
const { exec } = require("child_process");

function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    console.log(`Working directory: ${cwd}`);

    exec(
      command,
      {
        cwd,
        timeout: 120000,
        maxBuffer: 1024 * 1024,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);

        if (error) {
          reject(error);
          return;
        }

        resolve(stdout);
      }
    );
  });
}

exports.runClineCommand = async (command, repoPath, metadata) => {
  try {
    await runCommand(command, repoPath);
    console.log("Command completed successfully.");
  } catch (error) {
    console.error("Command failed:", error.message);
    throw error;
  }
};
