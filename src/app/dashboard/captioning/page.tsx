"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ImageUploader } from "@/components/shared/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateCaption } from "@/ai/flows/image-captioning";
import { Loader2, Camera, Copy, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CaptioningPage() {
  const [imageUri, setImageUri] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!imageUri) return;
    setLoading(true);
    try {
      const result = await generateCaption({ photoDataUri: imageUri });
      setCaption(result.caption);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to generate caption. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied",
      description: "Caption copied to clipboard.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-2">Image Captioning</h2>
          <p className="text-muted-foreground">Upload an image and GPT-OSS will generate a descriptive caption using its vision-aligned reasoning.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Imagery</CardTitle>
              <CardDescription>Supported formats: JPG, PNG, WEBP.</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader onImageSelected={setImageUri} />
              <Button 
                onClick={handleGenerate} 
                className="w-full mt-6 bg-secondary hover:bg-secondary/90" 
                disabled={!imageUri || loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                Generate Caption
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-lg">Resulting Caption</CardTitle>
              <CardDescription>AI-generated description based on visual features.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="bg-muted p-4 rounded-lg min-h-[150px] italic text-sm relative">
                {caption ? (
                  <p className="leading-relaxed">{caption}</p>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-50">
                    {loading ? "Generating..." : "Result will appear here"}
                  </div>
                )}
              </div>
              
              {caption && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1">
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCaption("")} className="flex-1">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Clear
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}