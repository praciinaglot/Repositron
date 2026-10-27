import repoSummary from "../outputs/repo_summary.json";

export default function RepoSummary() {
  const data = repoSummary as {
    stack: string[];
    entryPoints: string[];
    services: string[];
    envVars: string[];
  };

  return (
    <div className="mt-10 w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">
        Repository Summary
      </h2>

      <div className="text-sm text-gray-300 space-y-2">
        <p><strong>Tech Stack:</strong> {data.stack.join(", ")}</p>
        <p><strong>Entry Points:</strong> {data.entryPoints.join(", ")}</p>
        <p><strong>Services:</strong> {data.services.join(", ")}</p>
        <p><strong>Env Vars:</strong> {data.envVars.join(", ")}</p>
      </div>
    </div>
  );
}
