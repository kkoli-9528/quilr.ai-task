import { useState } from "react";
import { Group } from "./components/Group";
import type { GroupType } from "./types";

function App() {
  const [query, setQuery] = useState<GroupType>({
    logic: "AND",
    conditions: [],
  });

  const handleQueryChange = (updated: GroupType) => {
    setQuery(updated);
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Query Builder</h1>
      <Group group={query} onChange={handleQueryChange} />
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>
      {submitted && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          {JSON.stringify(query, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;