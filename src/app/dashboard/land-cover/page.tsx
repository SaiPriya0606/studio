"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ImageUploader } from "@/components/shared/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { landCoverClassification } from "@/ai/flows/land-cover-classification";
import { Loader2, Layers, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LandCoverPage() {
  const [eoUri, setEoUri] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClassify = async () => {
    if (!eoUri) return;
    setLoading(true);
    try {
      const result = await landCoverClassification({ 
        eoDataUri: eoUri,
        additionalInstructions: instructions
      });
      setReport(result.classificationReport);
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: "We couldn't process the EO data. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-2 text-primary">Land Cover Classification</h2>
            <p className="text-muted-foreground">Automated multi-spectral analysis for environmental monitoring using ISRO Level-2 data.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled={!report}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
             </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">EO Data Source</CardTitle>
                <CardDescription>Upload raw multi-spectral imagery or tiled geo-TIFF snapshots.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageUploader onImageSelected={setEoUri} label="Upload Satellite Data" />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domain Instructions (Optional)</label>
                  <Textarea 
                    placeholder="Focus on urban sprawl or forest health indicators..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="h-24"
                  />
                </div>

                <Button 
                  onClick={handleClassify} 
                  className="w-full bg-primary hover:bg-primary/90" 
                  disabled={!eoUri || loading}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Layers className="mr-2 h-4 w-4" />}
                  Classify Land Cover
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  Classification Report
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  {report ? (
                    <div className="bg-white p-6 rounded-md border shadow-inner whitespace-pre-wrap font-mono text-xs leading-relaxed overflow-y-auto max-h-[600px]">
                      {report}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-muted-foreground italic">
                      {loading ? (
                        <div className="text-center space-y-4">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-secondary" />
                          <p>Running neural classification models...</p>
                        </div>
                      ) : (
                        <p>No analysis results yet. Upload data to begin.</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}