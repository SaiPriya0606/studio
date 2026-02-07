import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Orbit, Search, FileText, Camera, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-satellite');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Orbit className="h-6 w-6 text-secondary" />
          <span className="font-headline font-bold text-xl tracking-tighter text-primary">VisionaryGPT</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">Features</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#eo-data">ISRO Data</Link>
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
            <Link href="/dashboard">Launch App</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-white overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Advanced Vision Intelligence <br /> for Earth Observation
                </h1>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Augmenting open-weight GPT-OSS with multimodal capabilities. Specialized in ISRO Earth Observation data analysis, VQA, and automated environmental monitoring.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold">
                  <Link href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          {heroImage && (
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Core Capabilities</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Multimodal Mastery</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bridge the gap between raw pixel data and human decision-making with our specialized vision-language alignment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                <Camera className="h-10 w-10 text-secondary" />
                <h3 className="text-xl font-bold font-headline">Image Captioning</h3>
                <p className="text-muted-foreground">Detailed descriptive captions for complex visual scenes and satellite imagery.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                <Search className="h-10 w-10 text-secondary" />
                <h3 className="text-xl font-bold font-headline">Visual Q&A</h3>
                <p className="text-muted-foreground">Interactive reasoning over images. Ask complex questions and receive grounded answers.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                <Globe className="h-10 w-10 text-secondary" />
                <h3 className="text-xl font-bold font-headline">EO Integration</h3>
                <p className="text-muted-foreground">Specialized support for ISRO satellite archives and time-series geospatial analysis.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="eo-data" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">ISRO Earth Observation</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Automating Land-cover classification and change detection. Transforming Level-1 and Level-2 EO Data into rich, human-readable reports.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    <span>Automated Land-cover mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    <span>Time-series change detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    <span>Environmental monitoring & alerts</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/dashboard">Access EO Tools</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                 <Image 
                    src={PlaceHolderImages.find(img => img.id === 'analysis-ui')?.imageUrl || ""} 
                    alt="Analysis UI" 
                    width={600} 
                    height={400} 
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="satellite analysis"
                  />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-muted-foreground">© 2025 VisionaryGPT. Built for the future of Earth Observation.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}