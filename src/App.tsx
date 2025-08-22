import { useState } from "react";
import ImageUpload from "./components/ImageUploadShadcn";
import AnalysisResults from "./components/AnalysisResultsShadcn";
import DemoInfo from "./components/DemoInfoShadcn";
import {
  azureVisionService,
  type AnalysisResult,
} from "./services/azureVision";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <div className="text-center space-y-4 p-4">
        <h1 className="text-4xl md:text-6xl font-bold">🔍 What Is This?</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload an image and identify objects using Azure Computer Vision AI
        </p>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex-1">
          {/* Demo Info (shown when Azure not configured) */}
          {!isAzureConfigured && (
            <div className="max-w-4xl mx-auto">
              <DemoInfo />
            </div>
          )}
          {/* Image Upload */}
          <div className="max-w-2xl mx-auto">
            <ImageUpload onImageSelect={handleImageSelect} disabled={loading} />
          </div>
        </div>

        {/* Analysis Results */}
        <AnalysisResults
          results={analysisResult}
          loading={loading}
          error={error}
          selectedImage={selectedImage}
        />
      </div>
      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-8">
        <p>Powered by Azure Computer Vision API</p>
      </footer>
    </div>
  );
}

export default App;
