import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setError("");
    setData(null);

    try {
      const res = await axios.get(`/api/github?repoOwner=${repoOwner}&repoName=${repoName}`);
      setData(res.data);
    } catch (err) {
      setError("Repository not found. Please check the name.");
    }
  };

  const resetForm = () => {
    setData(null);
    setRepoOwner("");
    setRepoName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-black-100 ">
      <div className="flex flex-col items-center justify-center p-10 border-2 border-white rounded-lg">
      <h1 className="text-3xl font-bold mb-5">GitHub Repository Analyzer</h1>

      <input
        type="text"
        placeholder="Repository Owner"
        className="p-2 border rounded mr-2 mb-4"
        value={repoOwner}
        onChange={(e) => setRepoOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Repository Name"
        className="p-2 border rounded mr-2 mb-4"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <button className="p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={fetchData}>
        Analyze
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {data && (
        <div className="mt-5 p-5 bg-black shadow-lg rounded">
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p>{data.description}</p>
          <p>⭐ Stars: {data.stargazers_count} | 🍴 Forks: {data.forks_count}</p>
          <p>🛠 Language: {data.language}</p>
          <button className="p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={resetForm}>Analyze Again</button>
        </div>
      )}
      </div>
    </div>
  );
}
