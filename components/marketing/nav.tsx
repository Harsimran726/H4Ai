"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export function Nav() {
  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          {/* Favicon image as nav logo */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-white border border-border shadow-sm">
            <Image src="/android-chrome-192x192.png" alt="H4Ai Logo" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span
            className="font-sora font-bold text-xl"
            style={{
              background: "linear-gradient(180deg, #1F4F91 0%, #0D223C 50%, #020810 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            H4Ai
          </span>
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Blog</Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/book-a-call" className={buttonVariants({ className: "uppercase font-sora rounded-lg px-6" })}>Book a Call</Link>
        </div>
      </div>
    </nav>
  );
}
