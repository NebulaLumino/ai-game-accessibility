"use client";
import { useState } from "react";

export default function AppPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setOutput(data.output || "No output received.");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Game Accessibility Mod Designer</h1>
        <p className="text-gray-400 mb-8">AI Game Accessibility Mod Designer</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded p-4 text-white"
            rows={6}
            placeholder="Enter your input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: "hsl(225deg, 70%, 55%)" }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4">{error}</p>}
        {output && (
          <div className="mt-6 p-6 bg-gray-900 border border-gray-700 rounded prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-200">{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
