"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function BlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_schema: "",
    is_published: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/admin/blog/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.blog) {
            setFormData({
              title: data.blog.title || "",
              slug: data.blog.slug || "",
              content: data.blog.content || "",
              excerpt: data.blog.excerpt || "",
              seo_title: data.blog.seo_title || "",
              seo_description: data.blog.seo_description || "",
              seo_keywords: data.blog.seo_keywords || "",
              seo_schema: data.blog.seo_schema || "",
              is_published: data.blog.is_published || false,
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSlugify = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    const dataToSave = { ...formData, is_published: publish };

    try {
      const url = id ? `/api/admin/blog/${id}` : "/api/admin/blog";
      const method = id ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const errorData = await res.json();
        alert("Failed: " + errorData.error);
      }
    } catch (e) {
      alert("Error saving blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading editor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-sora font-semibold text-foreground">
          {id ? "Edit Post" : "New Post"}
        </h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            Publish Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input name="title" value={formData.title} onChange={handleChange} onBlur={!id && !formData.slug ? handleSlugify : undefined} placeholder="e.g. The Future of AI" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Slug</label>
                <div className="flex gap-2">
                  <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. future-of-ai" />
                  <Button variant="secondary" onClick={handleSlugify}>Auto</Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Markdown Content</label>
                <Textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  placeholder="Write your post in Markdown..." 
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>SEO Optimization</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">Short Excerpt (AEO)</label>
                <Textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Summary of the post..." rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">SEO Meta Title</label>
                <Input name="seo_title" value={formData.seo_title} onChange={handleChange} placeholder="Optimal title for Google..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">SEO Meta Description</label>
                <Textarea name="seo_description" value={formData.seo_description} onChange={handleChange} placeholder="Search snippet description..." rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">Keywords (comma separated)</label>
                <Input name="seo_keywords" value={formData.seo_keywords} onChange={handleChange} placeholder="ai, agents, future" />
              </div>
              
              <div className="pt-4 border-t">
                <label className="text-sm font-medium mb-1 block text-muted-foreground">Google Search Preview</label>
                <div className="bg-white p-4 rounded-md border text-left font-sans mt-2">
                  <div className="text-sm text-[#202124] flex items-center gap-1 mb-1">
                    <span className="font-semibold text-xs bg-[#f1f3f4] rounded-full w-6 h-6 flex items-center justify-center mr-1">H</span>
                    <span>h4ai.in</span>
                    <span className="text-[#5f6368] mx-1">›</span>
                    <span className="text-[#5f6368]">blog {formData.slug ? `› ${formData.slug}` : ""}</span>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] mb-1 truncate hover:underline cursor-pointer">
                    {formData.seo_title || formData.title || "Your Post Title Here"}
                  </h3>
                  <p className="text-sm text-[#4d5156] line-clamp-2">
                    {formData.seo_description || formData.excerpt || "Your meta description will appear here. Make it compelling to encourage clicks."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium mb-1 block text-muted-foreground flex justify-between">
                  <span>Schema Markup (JSON-LD)</span>
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => {
                    const schema = {
                      "@context": "https://schema.org",
                      "@graph": [
                        {
                          "@type": "BlogPosting",
                          "@id": `https://h4ai.in/blog/${formData.slug || "post"}`,
                          "headline": formData.seo_title || formData.title,
                          "description": formData.seo_description || formData.excerpt,
                          "author": { "@id": "https://h4ai.in/#founder" },
                          "publisher": { "@id": "https://h4ai.in/#organization" }
                        },
                        {
                          "@type": "Person",
                          "@id": "https://h4ai.in/#founder",
                          "name": "Harsimran Singh",
                          "jobTitle": "Founder & Lead AI Engineer",
                          "url": "https://www.linkedin.com/in/harsimransinghaiengineer/",
                          "sameAs": [
                            "https://www.linkedin.com/in/harsimransinghaiengineer/"
                          ],
                          "worksFor": { "@id": "https://h4ai.in/#organization" },
                          "knowsAbout": [
                            "Artificial Intelligence",
                            "AI Voice Agents",
                            "Agentic AI Systems",
                            "Full-Stack Web Development",
                            "Next.js",
                            "FastAPI",
                            "LangGraph",
                            "Machine Learning"
                          ],
                          "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Mansa",
                            "addressRegion": "Punjab",
                            "addressCountry": "IN"
                          }
                        },
                        {
                          "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
                          "@id": "https://h4ai.in/#organization",
                          "name": "H4Ai",
                          "legalName": "H4Ai AI Development & Integration",
                          "url": "https://h4ai.in",
                          "logo": "https://h4ai.in/logo.png",
                          "image": "https://h4ai.in/og-image.jpg",
                          "description": "AI consultancy, infrastructure, and creative systems for ambitious businesses — building AI voice agents, agentic AI systems, premium websites, and social media growth.",
                          "slogan": "Run your business. We handle the rest.",
                          "founder": { "@id": "https://h4ai.in/#founder" },
                          "sameAs": [
                            "https://www.instagram.com/official.h4ai/",
                            "https://www.linkedin.com/in/harsimransinghaiengineer/"
                          ],
                          "priceRange": "$$",
                          "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Mansa",
                            "addressRegion": "Punjab",
                            "addressCountry": "IN"
                          },
                          "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "29.9834",
                            "longitude": "75.3970"
                          },
                          "areaServed": [
                            { "@type": "AdministrativeArea", "name": "Punjab" },
                            { "@type": "Country", "name": "India" },
                            { "@type": "City", "name": "Calgary" },
                            { "@type": "City", "name": "Saskatoon" },
                            { "@type": "City", "name": "Toronto" },
                            { "@type": "Country", "name": "Canada" },
                            { "@type": "City", "name": "Stuttgart" },
                            { "@type": "Country", "name": "Germany" },
                            { "@type": "City", "name": "Boston" },
                            { "@type": "Country", "name": "United States" }
                          ],
                          "knowsAbout": [
                            "AI Voice Agents",
                            "Agentic AI Systems",
                            "Custom Workflow Automation",
                            "High-Performance Web Development",
                            "Next.js Development",
                            "Social Media Management",
                            "Generative AI Filmmaking",
                            "Local Business Lead Generation"
                          ],
                          "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "H4Ai Core Services",
                            "itemListElement": [
                              {
                                "@type": "Offer",
                                "itemOffered": {
                                  "@type": "Service",
                                  "@id": "https://h4ai.in/#voice-agents",
                                  "name": "AI Voice Agents",
                                  "description": "24/7 autonomous AI phone agents that answer incoming customer calls, qualify leads, and book appointments directly into calendar systems.",
                                  "provider": { "@id": "https://h4ai.in/#organization" }
                                }
                              },
                              {
                                "@type": "Offer",
                                "itemOffered": {
                                  "@type": "Service",
                                  "@id": "https://h4ai.in/#agentic-ai",
                                  "name": "Agentic AI Systems",
                                  "description": "Custom multi-agent AI systems that automate complex, multi-step back-office workflows and data processing from end to end.",
                                  "provider": { "@id": "https://h4ai.in/#organization" }
                                }
                              },
                              {
                                "@type": "Offer",
                                "itemOffered": {
                                  "@type": "Service",
                                  "@id": "https://h4ai.in/#web-development",
                                  "name": "Website Development",
                                  "description": "Fast, high-converting, modern websites engineered with Next.js to turn local and international visitors into paying clients.",
                                  "provider": { "@id": "https://h4ai.in/#organization" }
                                }
                              },
                              {
                                "@type": "Offer",
                                "itemOffered": {
                                  "@type": "Service",
                                  "@id": "https://h4ai.in/#social-media",
                                  "name": "Social Media Management",
                                  "description": "Complete social media content strategy, visual design, AI video creation, and consistent distribution to maintain brand authority.",
                                  "provider": { "@id": "https://h4ai.in/#organization" }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "@type": "FAQPage",
                          "@id": "https://h4ai.in/#faq",
                          "mainEntity": [
                            {
                              "@type": "Question",
                              "name": "What does H4Ai actually do?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We build AI voice agents, agentic AI systems, modern websites, and manage social media for businesses. We act as your all-in-one digital growth and tech partner."
                              }
                            },
                            {
                              "@type": "Question",
                              "name": "Where are you based and who do you serve?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We are based in Mansa, Punjab. We work closely with local businesses across Punjab and India, while also serving premium AI and web clients in North America (Canada and the US) and Europe (Germany)."
                              }
                            },
                            {
                              "@type": "Question",
                              "name": "How do we get started with H4Ai?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "It starts with a free discovery call. We'll look at how your business runs currently and identify the biggest opportunities for growth or automation."
                              }
                            }
                          ]
                        },
                        {
                          "@type": "Review",
                          "itemReviewed": { "@id": "https://h4ai.in/#organization" },
                          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                          "author": { "@type": "Person", "name": "Client A" },
                          "reviewBody": "H4Ai transformed how we handle customer inquiries. The AI voice agent alone paid for itself in week one.",
                          "locationCreated": { "@type": "City", "name": "Saskatoon" }
                        },
                        {
                          "@type": "Review",
                          "itemReviewed": { "@id": "https://h4ai.in/#organization" },
                          "reviewRating": { "@type": "Rating", "rating" :"5", "bestRating": "5" },
                          "author": { "@type": "Person", "name": "Client B" },
                          "reviewBody": "Finally an agency that actually understands the tech. They built a custom system that automated our entire backend.",
                          "locationCreated": { "@type": "City", "name": "Chandigarh" }
                        },
                        {
                          "@type": "Review",
                          "itemReviewed": { "@id": "https://h4ai.in/#organization" },
                          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                          "author": { "@type": "Person", "name": "Client C" },
                          "reviewBody": "Our website is blazing fast and the social media content is always spot on. Highly recommend.",
                          "locationCreated": { "@type": "City", "name": "Mansa" }
                        }
                      ]
                    };
                    setFormData(prev => ({ ...prev, seo_schema: JSON.stringify(schema, null, 2) }));
                  }}>
                    Generate Default
                  </Button>
                </label>
                <Textarea 
                  name="seo_schema" 
                  value={formData.seo_schema} 
                  onChange={handleChange} 
                  placeholder='{ "@context": "https://schema.org", "@type": "BlogPosting", ... }' 
                  rows={6} 
                  className="font-mono text-xs mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogEditor />
    </Suspense>
  );
}
