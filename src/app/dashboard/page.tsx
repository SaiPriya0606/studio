import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MessageSquare, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    { label: "Captions Generated", value: "1,284", icon: Camera },
    { label: "VQA Queries", value: "3,512", icon: MessageSquare },
    { label: "EO Data Processed", value: "12.4 TB", icon: Globe },
    { label: "Reports Created", value: "482", icon: FileText },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-2">Welcome back, Scientist</h2>
          <p className="text-muted-foreground">Monitor and manage your vision-augmented GPT-OSS activities here.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Recent System Activity</CardTitle>
              <CardDescription>Continuous monitoring of GPT-OSS model performance and training logs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 mins ago", msg: "Image captioning request processed successfully.", type: "success" },
                  { time: "15 mins ago", msg: "EO Data classification completed for Rajasthan sector.", type: "info" },
                  { time: "1 hour ago", msg: "Batch report generation triggered for daily change detection.", type: "warning" },
                  { time: "3 hours ago", msg: "Vision encoder alignment re-sync completed.", type: "success" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        log.type === 'success' ? 'bg-green-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      )} />
                      <span className="text-sm">{log.msg}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quick Actions</CardTitle>
              <CardDescription>Frequent analysis tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full justify-start gap-3">
                <Link href="/dashboard/captioning">
                  <Camera className="h-4 w-4" /> Generate New Caption
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-3">
                <Link href="/dashboard/vqa">
                  <MessageSquare className="h-4 w-4" /> Ask Image Question
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-3">
                <Link href="/dashboard/eo-analysis">
                  <Globe className="h-4 w-4" /> Start EO Analysis
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-3">
                <Link href="/dashboard/reports">
                  <FileText className="h-4 w-4" /> Create New Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
