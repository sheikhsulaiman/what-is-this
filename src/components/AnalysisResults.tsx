import React from "react";
import type { AnalysisResult } from "../services/azureVision";
import "./AnalysisResults.css";

interface AnalysisResultsProps {
  results: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  results,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="analysis-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing image...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-container">
        <div className="error">
          <h3>❌ Analysis Failed</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="analysis-container">
      <h2>🔍 Analysis Results</h2>

      {/* Description */}
      {results.description.length > 0 && (
        <div className="result-section">
          <h3>📝 Description</h3>
          <div className="description-list">
            {results.description.map((desc, index) => (
              <p key={index} className="description-item">
                {desc}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Detected Objects */}
      {results.objects.length > 0 && (
        <div className="result-section">
          <h3>🎯 Detected Objects</h3>
          <div className="objects-grid">
            {results.objects.map((obj, index) => (
              <div key={index} className="object-card">
                <div className="object-name">{obj.object}</div>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{ width: `${obj.confidence * 100}%` }}
                  ></div>
                </div>
                <div className="confidence-text">
                  {(obj.confidence * 100).toFixed(1)}% confidence
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {results.tags.length > 0 && (
        <div className="result-section">
          <h3>🏷️ Tags</h3>
          <div className="tags-container">
            {results.tags
              .filter((tag) => tag.confidence > 0.5) // Only show tags with >50% confidence
              .sort((a, b) => b.confidence - a.confidence) // Sort by confidence
              .map((tag, index) => (
                <span key={index} className="tag">
                  {tag.name} ({(tag.confidence * 100).toFixed(0)}%)
                </span>
              ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {results.objects.length === 0 &&
        results.tags.length === 0 &&
        results.description.length === 0 && (
          <div className="no-results">
            <p>No objects or tags detected in this image.</p>
          </div>
        )}
    </div>
  );
};

export default AnalysisResults;
