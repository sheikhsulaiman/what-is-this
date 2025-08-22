import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  disabled = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    onImageSelect(file);
  };

  const onButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {previewUrl ? (
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto object-contain rounded-lg border"
              />
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={onButtonClick}
                  disabled={disabled}
                  className="min-w-[120px]"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
                <Button
                  variant="destructive"
                  onClick={clearImage}
                  disabled={disabled}
                  className="min-w-[120px]"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={cn(
            "border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-primary/50",
            dragActive && "border-primary bg-primary/5 scale-[1.02]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
            <div
              className={cn(
                "p-4 rounded-full bg-primary/10 transition-all duration-200",
                dragActive && "scale-110 bg-primary/20"
              )}
            >
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {dragActive ? "Drop the image here" : "Upload an image"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Click to browse or drag and drop your image here
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUpload;
