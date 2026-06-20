import React from 'react'
import { useState } from 'react'

function AiInsight() {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/insights");
      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }
      const data = await response.json();
      setInsights(data.insight);
    } catch (err) {
      setError("Could not connect to the AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md mb-8 border border-purple-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-indigo-900">✨ AI Financial Consultant</h3>
        <button 
          onClick={fetchInsights} 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {insights && (
        <div className="bg-white p-4 rounded-lg shadow-inner border border-purple-50">
          {/* whitespace-pre-line ensures the bullet points and line breaks from the AI render correctly */}
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {insights}
          </p>
        </div>
      )}
    </div>
  )
}

export default AiInsight