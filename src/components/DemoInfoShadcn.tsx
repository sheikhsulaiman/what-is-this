import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Rocket, Key, Play, Lightbulb } from "lucide-react";

const DemoInfo: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Rocket className="h-6 w-6" />
          Getting Started
        </CardTitle>
        <p className="text-muted-foreground">
          Follow these steps to set up Azure Computer Vision and start analyzing
          images
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Step 1 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold">Create Azure Resource</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Go to the Azure Portal and create a new Computer Vision resource
              to get your API credentials.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a
                href="https://portal.azure.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Azure Portal
              </a>
            </Button>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold">Get API Credentials</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Navigate to "Keys and Endpoint" in your Computer Vision resource
              to copy your API key and endpoint URL.
            </p>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                API Key + Endpoint Required
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold">Configure Environment</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Update your{" "}
              <code className="px-1 py-0.5 bg-muted rounded text-xs">.env</code>{" "}
              file with your Azure credentials:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-muted rounded-lg font-mono text-xs">
                <div>VITE_AZURE_VISION_KEY=your_api_key</div>
                <div>VITE_AZURE_VISION_ENDPOINT=your_endpoint</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold">Start Analyzing!</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload an image above and watch our AI identify objects, generate
              descriptions, and tag content automatically.
            </p>
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Ready to go!
              </span>
            </div>
          </div>
        </div>

        {/* Usage Limits Info */}
        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                API Usage Limits
              </h4>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Free Tier
                  </Badge>
                  <span>5,000 calls/month, 20 calls/minute</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Standard
                  </Badge>
                  <span>10 calls/second</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoInfo;
