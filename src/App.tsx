import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import AnalysisResults from "./components/AnalysisResults";
import DemoInfo from "./components/DemoInfo";
import {
  azureVisionService,
  type AnalysisResult,
} from "./services/azureVision";
import "./App.css";

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Check if Azure credentials are configured
  const isAzureConfigured =
    import.meta.env.VITE_AZURE_VISION_KEY &&
    import.meta.env.VITE_AZURE_VISION_ENDPOINT;

  const handleImageSelect = async (file: File, imageUrl: string) => {
    setSelectedImage(imageUrl);
    setAnalysisResult(null);
    setError(null);

    if (!isAzureConfigured) {
      setError(
        "Azure Computer Vision is not configured. Please check your environment variables."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await azureVisionService.analyzeImage(file);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔍 What Is This?</h1>
        <p>Upload an image to identify objects using Azure Computer Vision</p>
      </header>

      <main className="app-main">
        {!isAzureConfigured && <DemoInfo />}

        <div className="upload-section">
          <ImageUpload onImageSelect={handleImageSelect} disabled={loading} />
        </div>

        {selectedImage && (
          <div className="selected-image-container">
            <h3>Selected Image:</h3>
            <img
              src={selectedImage}
              alt="Selected for analysis"
              className="selected-image"
            />
          </div>
        )}

        <AnalysisResults
          results={analysisResult}
          loading={loading}
          error={error}
        />
      </main>

      <footer className="app-footer">
        <p>Powered by Azure Computer Vision API</p>
      </footer>
    </div>
  );
}

export default App;
