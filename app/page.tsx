import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bot, Workflow, Zap } from "lucide-react";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Create Powerful Web Scraping Workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build, automate, and manage web scraping workflows without coding.
              Extract data from any website with our visual workflow builder.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Scraping for Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 px-6 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Workflow className="w-10 h-10" />}
                title="Visual Workflow Builder"
                description="Create complex scraping workflows with our intuitive drag-and-drop interface."
              />
              <FeatureCard
                icon={<Bot className="w-10 h-10" />}
                title="AI-Powered Extraction"
                description="Leverage AI to automatically identify and extract relevant data from web pages."
              />
              <FeatureCard
                icon={<Zap className="w-10 h-10" />}
                title="Automated Execution"
                description="Schedule and automate your workflows to run at specified intervals."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          © {new Date().getFullYear()} ScrapeFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
