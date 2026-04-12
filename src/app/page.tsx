"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || "No result returned.");
    } catch {
      setResult("Error generating content.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col items-center justify-center p-6 gap-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "hsl(340deg,55%,55%)" }}>
          ♿ Game Accessibility Auditor
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Describe your game context and constraints — AI generates the content.
        </p>
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
          <textarea
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-rose-400 transition-colors"
            rows={5}
            placeholder="e.g., Audit a fast-paced FPS for colorblind players, motor accessibility, and cognitive load..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "hsl(340deg,55%,55%)" }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        {result && (
          <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-inner">
            <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
              Accessibility Report
            </h2>
            <div className="text-gray-100 whitespace-pre-wrap text-sm leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
