"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-4xl font-sora font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm transition-all hover:opacity-80">
              H4Ai
            </span>
          </Link>
        </div>

        <Card className="w-full shadow-lg border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-sora font-semibold">Admin Login</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="transition-all focus:ring-2 focus:ring-primary/20 bg-background/50"
                  placeholder="admin@h4ai.in"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground/80">Password</label>
                  <Link href="/admin/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="transition-all focus:ring-2 focus:ring-primary/20 bg-background/50"
                  placeholder="••••••••"
                />
              </div>

              <div className="min-h-[24px]">
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 font-medium tracking-wide transition-all hover:scale-[1.02] active:scale-95" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    <span>Signing in...</span>
                  </motion.div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
