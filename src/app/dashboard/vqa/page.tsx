"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ImageUploader } from "@/components/shared/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { visualQuestionAnswering } from "@/ai/flows/visual-question-answering";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VQAPage() {
  const [imageUri, setImageUri] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUri || !question) return;
    setLoading(true);
    try {
      const result = await visualQuestionAnswering({ 
        photoDataUri: imageUri,
        question: question
      });
      setAnswer(result.answer);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to answer question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-2">Visual Question Answering</h2>
          <p className="text-muted-foreground">Ask deep questions about visual details, objects, and spatial relationships within your images.</p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image Analysis Environment</CardTitle>
              <CardDescription>Upload an image and start the conversation.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <ImageUploader onImageSelected={setImageUri} label="Select Scene for Analysis" />
              </div>

              <div className="space-y-4 flex flex-col">
                <form onSubmit={handleAsk} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Question</label>
                    <Input 
                      placeholder="e.g., How many vehicles are in this satellite image?" 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90" 
                    disabled={!imageUri || !question || loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Ask VisionaryGPT
                  </Button>
                </form>

                <div className="flex-1 mt-4">
                  <label className="text-sm font-medium mb-2 block">Answer History</label>
                  <div className="bg-muted p-4 rounded-lg min-h-[150px] border">
                    {answer ? (
                      <div className="space-y-3">
                         <div className="flex gap-2 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" /> 
                            <span>Grounded Response</span>
                         </div>
                         <p className="text-sm leading-relaxed">{answer}</p>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground opacity-50 text-sm">
                        {loading ? "Analyzing visual embeddings..." : "Responses will appear here"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}