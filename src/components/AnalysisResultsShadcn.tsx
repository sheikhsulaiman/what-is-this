import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Search, Tag, FileText, AlertCircle } from "lucide-react";
import type { AnalysisResult } from "@/services/azureVision";

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
  // Function to capitalize first letter of a string
  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto flex-1">
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
      <Card className="w-full max-w-2xl mx-auto border-destructive/50 flex-1">
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
    <div className="w-full max-w-4xl mx-auto space-y-6 flex-1">
      {/* <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Search className="h-6 w-6" />
          Analysis Results
        </h2>
        <p className="text-muted-foreground">
          Here's what our AI found in your image
        </p>
      </div> */}

      <div className="grid gap-6 md:grid-cols-1">
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
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <h4 className="font-medium capitalize">{obj.object}</h4>
                      <Progress
                        value={obj.confidence * 100}
                        className="h-2 flex-1"
                      />
                    </div>
                    <Badge variant="secondary">
                      {(obj.confidence * 100).toFixed(1)}%
                    </Badge>
                  </div>
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
                    <Badge key={index} variant="outline" className="px-3 py-1">
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
                  <h3 className="text-lg font-semibold">No objects detected</h3>
                  <p className="text-sm text-muted-foreground">
                    Try uploading a different image with clearer objects
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
};

export default AnalysisResults;
