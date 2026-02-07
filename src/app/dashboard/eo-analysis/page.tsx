"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Layers, History, Search, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EOAnalysisHub() {
  const tools = [
    {
      title: "Land Cover Mapping",
      desc: "Identify vegetation, water bodies, and urban structures using multi-spectral signatures.",
      icon: Layers,
      href: "/dashboard/land-cover",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Temporal Analysis",
      desc: "Detect significant shifts in topography and environment over months or years.",
      icon: History,
      href: "/dashboard/change-detection",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Geospatial Search",
      desc: "Interact with the ISRO satellite archives through natural language queries.",
      icon: Search,
      href: "/dashboard/vqa",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-3 rounded-full bg-secondary/10 text-secondary mb-2">
            <Globe className="h-10 w-10" />
          </div>
          <h2 className="text-4xl font-bold font-headline">ISRO Earth Observation Suite</h2>
          <p className="text-xl text-muted-foreground">
            Leverage augmented GPT-OSS to transform raw satellite telemetry into actionable environmental intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.title} className="group hover:shadow-xl transition-all border-2 border-transparent hover:border-secondary/20">
              <CardHeader>
                <div className={cn("p-4 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110", tool.bg)}>
                  <tool.icon className={cn("h-8 w-8", tool.color)} />
                </div>
                <CardTitle className="text-2xl font-headline">{tool.title}</CardTitle>
                <CardDescription className="text-sm min-h-[60px]">{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={tool.href}>Launch Tool <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold font-headline">Bridge the Level-1 to Level-2 Gap</h3>
              <p className="text-white/80 leading-relaxed">
                Raw geospatial data is often complex for decision-makers. VisionaryGPT provides conversational exploration of archives, allowing interactive QA over time-series imagery and automated generation of human-readable reports.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard/reports">Go to Report Generator</Link>
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-1">98.2%</div>
                  <div className="text-xs text-white/60">Classification Accuracy</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-1">10ms</div>
                  <div className="text-xs text-white/60">Inference Latency</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-1">20B</div>
                  <div className="text-xs text-white/60">Model Parameters</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-1">∞</div>
                  <div className="text-xs text-white/60">Scalable Archives</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-20%] opacity-10">
             <Orbit className="h-96 w-96 text-white" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}