"use client";

import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center min-h-[70vh] bg-background">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-sora font-semibold text-foreground mb-6">
            Something went wrong.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            We've been notified and are looking into it. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => reset()} className="uppercase font-sora rounded-lg">
              Try Again
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
