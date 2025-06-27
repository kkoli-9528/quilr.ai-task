import { useState } from "react";
import Group from "./components/Group";

const App = () => {
  const [queryData, setQueryData] = useState({ logic: "AND", conditions: [] });
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Query Builder</h1>
      <Group group={queryData} onChange={setQueryData} />
      <button
        onClick={() => setShowResult(true)}
        className="border px-3 py-1 mt-2"
      >
        Submit
      </button>
      {showResult && (
        <pre className="p-4 text-sm">{JSON.stringify(queryData, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;
