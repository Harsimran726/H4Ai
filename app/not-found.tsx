import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | H4Ai",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center min-h-[70vh] bg-background">
        <div className="container px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-sora font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-sora font-semibold text-foreground mb-6">
            We couldn't find that page.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            The page you're looking for might have been moved or deleted. Don't worry, we can get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className={buttonVariants({ size: "lg", className: "uppercase font-sora rounded-lg" })}>Back to Home</Link>
            <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "uppercase font-sora rounded-lg border-border" })}>Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
