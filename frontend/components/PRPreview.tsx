import prData from "../outputs/pr_metadata.json";

export default function PRPreview() {
  return (
    <div className="mt-10 w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">
        Pull Request Created
      </h2>

      <p className="text-sm text-gray-300 mb-2">
        <strong>Title:</strong> {prData.title}
      </p>

      <p className="text-sm text-gray-300 mb-2">
        <strong>Branch:</strong> {prData.branch}
      </p>

      <p className="text-sm text-gray-300 mb-2">
        <strong>Files Changed:</strong>
      </p>

      <ul className="text-sm text-gray-400 list-disc list-inside">
        {prData.filesChanged.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}
