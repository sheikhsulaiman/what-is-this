import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

// Azure Computer Vision configuration
const AZURE_VISION_KEY = import.meta.env.VITE_AZURE_VISION_KEY;
const AZURE_VISION_ENDPOINT = import.meta.env.VITE_AZURE_VISION_ENDPOINT;

export interface DetectedObject {
  object: string;
  confidence: number;
  rectangle: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface AnalysisResult {
  objects: DetectedObject[];
  description: string[];
  tags: Array<{ name: string; confidence: number }>;
}

class AzureVisionService {
  private client: ComputerVisionClient | null = null;

  constructor() {
    if (AZURE_VISION_KEY && AZURE_VISION_ENDPOINT) {
      const credentials = new ApiKeyCredentials({
        inHeader: { "Ocp-Apim-Subscription-Key": AZURE_VISION_KEY },
      });
      this.client = new ComputerVisionClient(
        credentials,
        AZURE_VISION_ENDPOINT
      );
    }
  }

  async analyzeImage(imageFile: File): Promise<AnalysisResult> {
    if (!this.client) {
      throw new Error(
        "Azure Computer Vision client not initialized. Please check your API key and endpoint."
      );
    }

    try {
      // Convert file to array buffer
      const imageBuffer = await this.fileToArrayBuffer(imageFile);

      // Analyze image for objects
      const objectAnalysis = await this.client.analyzeImageInStream(
        imageBuffer,
        {
          visualFeatures: ["Objects", "Description", "Tags"],
        }
      );

      // Format the results
      const objects: DetectedObject[] =
        objectAnalysis.objects?.map(
          (obj: {
            object?: string;
            confidence?: number;
            rectangle?: { x?: number; y?: number; w?: number; h?: number };
          }) => ({
            object: obj.object || "Unknown",
            confidence: obj.confidence || 0,
            rectangle: {
              x: obj.rectangle?.x || 0,
              y: obj.rectangle?.y || 0,
              w: obj.rectangle?.w || 0,
              h: obj.rectangle?.h || 0,
            },
          })
        ) || [];

      const description =
        objectAnalysis.description?.captions?.map(
          (caption: { text?: string }) => caption.text || ""
        ) || [];
      const tags =
        objectAnalysis.tags?.map(
          (tag: { name?: string; confidence?: number }) => ({
            name: tag.name || "",
            confidence: tag.confidence || 0,
          })
        ) || [];

      return {
        objects,
        description,
        tags,
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw new Error("Failed to analyze image. Please try again.");
    }
  }

  // Alternative method using URL instead of file upload
  async analyzeImageFromUrl(imageUrl: string): Promise<AnalysisResult> {
    if (!this.client) {
      throw new Error(
        "Azure Computer Vision client not initialized. Please check your API key and endpoint."
      );
    }

    try {
      const analysis = await this.client.analyzeImage(imageUrl, {
        visualFeatures: ["Objects", "Description", "Tags"],
      });

      const objects: DetectedObject[] =
        analysis.objects?.map(
          (obj: {
            object?: string;
            confidence?: number;
            rectangle?: { x?: number; y?: number; w?: number; h?: number };
          }) => ({
            object: obj.object || "Unknown",
            confidence: obj.confidence || 0,
            rectangle: {
              x: obj.rectangle?.x || 0,
              y: obj.rectangle?.y || 0,
              w: obj.rectangle?.w || 0,
              h: obj.rectangle?.h || 0,
            },
          })
        ) || [];

      const description =
        analysis.description?.captions?.map(
          (caption: { text?: string }) => caption.text || ""
        ) || [];
      const tags =
        analysis.tags?.map((tag: { name?: string; confidence?: number }) => ({
          name: tag.name || "",
          confidence: tag.confidence || 0,
        })) || [];

      return {
        objects,
        description,
        tags,
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw new Error("Failed to analyze image. Please try again.");
    }
  }

  private async fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to ArrayBuffer"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  }
}

export const azureVisionService = new AzureVisionService();
