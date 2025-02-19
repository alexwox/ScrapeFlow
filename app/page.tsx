"use client";
import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
import Logo from "@/components/Logo";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectToHome() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null;
}

export default function Page() {
  return (
    <>
      {/* Show the landing page if user is signed out */}

      <LandingPage />

      {/* Redirect to /home if user is signed in */}
      <SignedIn>
        <RedirectToHome />
      </SignedIn>
    </>
  );
}

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <SignInButton>
            <Button variant="outline">Sign up / Log in</Button>
          </SignInButton>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Automate Your Web Scraping Workflow
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  ScrapeFlow helps you create custom scraping projects with
                  ease. Streamline your data collection process and boost your
                  productivity.
                </p>
              </div>
              <div className="space-x-4">
                <SignInButton>
                  <Button>Get Started</Button>
                </SignInButton>
                <Link href="#features">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={CirclePlayIcon}
                title="Workflow Automation"
                description="Create and manage complex scraping workflows with ease."
              />
              <FeatureCard
                icon={WaypointsIcon}
                title="Multi-phase Scraping"
                description="Break down your scraping tasks into manageable phases for better organization."
              />
              <FeatureCard
                icon={CoinsIcon}
                title="Credit System"
                description="Pay only for what you use with our flexible credit-based pricing."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ScrapeFlow. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
      <Icon className="h-12 w-12 mb-4 text-primary" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
