import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Loader2,
  Search,
  Tag,
  FileText,
  AlertCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { AnalysisResult } from "@/services/azureVision";

interface AnalysisResultsProps {
  results: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  selectedImage: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  results,
  loading,
  error,
  selectedImage,
}) => {
  const [selectedObjectIndex, setSelectedObjectIndex] = useState<number | null>(
    null
  );
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [imageDimensions, setImageDimensions] = useState<{
    displayWidth: number;
    displayHeight: number;
    naturalWidth: number;
    naturalHeight: number;
  }>({ displayWidth: 0, displayHeight: 0, naturalWidth: 0, naturalHeight: 0 });

  // Text-to-speech functionality
  const speakText = (text: string) => {
    // Check if speech is enabled and speech synthesis is supported
    if (speechEnabled && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Create a new speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // Normal speed
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 0.8; // Slightly lower volume

      // Speak the text
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to capitalize first letter of a string
  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Analyzing image...</h3>
            <p className="text-sm text-muted-foreground">
              Our AI is identifying objects in your image
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-destructive">
              Analysis Failed
            </h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="w-full container mx-auto space-y-6">
      {/* <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Search className="h-6 w-6" />
          Analysis Results
        </h2>
        <p className="text-muted-foreground">
          Here's what our AI found in your image
        </p>
      </div> */}

      <div className="gap-6 flex">
        {/* Image with Bounding Boxes */}
        {selectedImage && results && results.objects.length > 0 && (
          <Card className="max-w-5xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Image with Object Detection
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className="flex items-center gap-2"
                >
                  {speechEnabled ? (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Audio On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span className="hidden sm:inline">Audio Off</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Analyzed"
                  className="max-w-full h-auto block"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    // Small delay to ensure the layout has settled
                    setTimeout(() => {
                      setImageDimensions({
                        displayWidth: img.offsetWidth,
                        displayHeight: img.offsetHeight,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                      });
                    }, 100);
                  }}
                />
                {/* Render bounding boxes */}
                {imageDimensions.displayWidth > 0 &&
                  imageDimensions.naturalWidth > 0 &&
                  results.objects.map((obj, index) => {
                    const isSelected = selectedObjectIndex === index;
                    const { x, y, w, h } = obj.rectangle;

                    // Calculate scaled positions based on displayed image size vs natural size
                    const scaleX =
                      imageDimensions.displayWidth /
                      imageDimensions.naturalWidth;
                    const scaleY =
                      imageDimensions.displayHeight /
                      imageDimensions.naturalHeight;

                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className={`absolute border-2 cursor-pointer transition-all duration-200 pointer-events-auto z-10 ${
                              isSelected
                                ? "border-red-500 bg-red-500/20 shadow-lg"
                                : "border-blue-500 bg-blue-500/10 hover:border-blue-600"
                            }`}
                            style={{
                              left: `${x * scaleX}px`,
                              top: `${y * scaleY}px`,
                              width: `${w * scaleX}px`,
                              height: `${h * scaleY}px`,
                            }}
                            onClick={() =>
                              setSelectedObjectIndex(isSelected ? null : index)
                            }
                            onMouseEnter={() => speakText(obj.object)}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white border-gray-700">
                          <div className="flex flex-col items-center space-y-1">
                            <span className="font-medium capitalize">
                              {obj.object}
                            </span>
                            <span className="text-xs text-gray-300">
                              {(obj.confidence * 100).toFixed(1)}% confidence
                            </span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex-1 space-y-6">
          {/* Description */}
          {results.description.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.description.map((desc, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    {capitalizeFirstLetter(desc)}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          {/* Detected Objects */}
          {results.objects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Detected Objects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1">
                  {results.objects.map((obj, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex items-center justify-between p-4 rounded-lg border bg-card gap-4 cursor-pointer transition-all duration-200 ${
                            selectedObjectIndex === index
                              ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                          }`}
                          onClick={() =>
                            setSelectedObjectIndex(
                              selectedObjectIndex === index ? null : index
                            )
                          }
                          onMouseEnter={() => speakText(obj.object)}
                        >
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium capitalize">
                              {obj.object}
                            </h4>
                            <Progress
                              value={obj.confidence * 100}
                              className="h-2"
                            />
                          </div>
                          <Badge variant="secondary">
                            {(obj.confidence * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white border-gray-700">
                        <div className="flex flex-col items-center space-y-1">
                          <span className="font-medium">
                            Click to highlight on image
                          </span>
                          <span className="text-xs text-gray-300">
                            Confidence: {(obj.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* Tags */}
          {results.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.tags
                    .filter((tag) => tag.confidence > 0.5)
                    .sort((a, b) => b.confidence - a.confidence)
                    .map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        {tag.name} ({(tag.confidence * 100).toFixed(0)}%)
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* No results message */}
          {results.objects.length === 0 &&
            results.tags.length === 0 &&
            results.description.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">
                      No objects detected
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try uploading a different image with clearer objects
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
