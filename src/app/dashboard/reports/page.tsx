"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateReport } from "@/ai/flows/automated-report-generation";
import { Loader2, FileText, Printer, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const [geoData, setGeoData] = setGeoData("");
  const [reasoning, setReasoning] = useState<string>("");
  const [finalReport, setFinalReport] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [displayDate, setDisplayDate] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setDisplayDate(new Date().toLocaleDateString());
  }, []);

  const handleGenerate = async () => {
    if (!geoData || !reasoning) return;
    setLoading(true);
    try {
      const result = await generateReport({ 
        geospatialAnalysis: geoData,
        reasoningOverEoData: reasoning
      });
      setFinalReport(result.report);
    } catch (err) {
      toast({
        title: "Report Failed",
        description: "Unable to synthesize the report from provided inputs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-2 text-primary">Scientific Report Synthesizer</h2>
            <p className="text-muted-foreground">Combine raw spatial analytics with AI reasoning to produce executive-level documentation.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={!finalReport}><Printer className="h-4 w-4 mr-2" /> Print</Button>
            <Button variant="outline" size="sm" disabled={!finalReport}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Synthesis Inputs</CardTitle>
                <CardDescription>Paste your analysis snippets below to generate a unified document.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Spatial Analytics Data</label>
                  <Textarea 
                    placeholder="Enter coordinates, classification indices, or pixel stats..."
                    className="min-h-[150px] font-mono text-xs"
                    value={geoData}
                    onChange={(e) => setGeoData(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Generative AI Reasoning</label>
                  <Textarea 
                    placeholder="Enter AI insights, anomalies detected, or qualitative observations..."
                    className="min-h-[150px]"
                    value={reasoning}
                    onChange={(e) => setReasoning(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleGenerate} 
                  className="w-full bg-secondary hover:bg-secondary/90 py-6" 
                  disabled={!geoData || !reasoning || loading}
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileText className="mr-2 h-5 w-5" />}
                  Synthesize Executive Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle>Generated Document</CardTitle>
                <CardDescription className="text-white/70">ISO-compliant formatting for environmental stakeholders.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                {finalReport ? (
                  <div className="p-8 h-full max-h-[800px] overflow-y-auto bg-white text-black font-serif leading-relaxed">
                    <div className="mb-12 text-center">
                       <h1 className="text-2xl font-bold uppercase underline">Earth Observation Summary Report</h1>
                       {mounted && (
                         <p className="text-xs mt-2 italic text-muted-foreground">
                           Generated by VisionaryGPT on {displayDate}
                         </p>
                       )}
                    </div>
                    <div className="whitespace-pre-wrap">{finalReport}</div>
                  </div>
                ) : (
                  <div className="h-full min-h-[500px] flex items-center justify-center text-muted-foreground italic text-center p-12">
                    {loading ? (
                      <div className="space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto text-secondary" />
                        <p className="text-lg not-italic font-headline">Synthesizing comprehensive analysis...</p>
                      </div>
                    ) : (
                      "Synthesized report content will be formatted here after inputs are provided."
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function setGeoData(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
