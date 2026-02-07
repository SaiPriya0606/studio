"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzeChangeDetection } from "@/ai/flows/change-detection-analysis";
import { Loader2, History, Calendar, MapPin, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChangeDetectionPage() {
  const [date1, setDate1] = useState<string>("2023-01-01");
  const [date2, setDate2] = useState<string>("2024-01-01");
  const [area, setArea] = useState<string>("Bengaluru Urban Sector 4");
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeChangeDetection({ 
        date1,
        date2,
        areaOfInterest: area
      });
      setReport(result.report);
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: "Change detection engine encountered an error.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-2">Time-Series Change Detection</h2>
          <p className="text-muted-foreground">Quantify environmental shifts between two temporal states across geospatial archives.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Temporal Window
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-muted-foreground">Baseline Date</label>
                <Input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-muted-foreground">Comparison Date</label>
                <Input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Spatial Target
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-muted-foreground">Area of Interest</label>
                <Input placeholder="e.g., Sundarbans Delta Region" value={area} onChange={(e) => setArea(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 flex flex-col justify-center items-center bg-muted/50">
             <Button 
                onClick={handleAnalyze} 
                className="w-[80%] bg-secondary hover:bg-secondary/90 h-16 text-lg font-bold" 
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Search className="mr-2 h-6 w-6" />}
                Run Analysis
              </Button>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comparative Intelligence Output</CardTitle>
            <CardDescription>Detailed breakdown of detected deviations and spatial reasoning.</CardDescription>
          </CardHeader>
          <CardContent>
            {report ? (
              <div className="bg-card p-6 rounded border font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {report}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                {loading ? (
                  <>
                    <History className="h-10 w-10 animate-pulse mb-4 text-secondary" />
                    <p>Fetching time-series data and computing diffs...</p>
                  </>
                ) : (
                  <p>Configure temporal parameters and click 'Run Analysis' to see results.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}