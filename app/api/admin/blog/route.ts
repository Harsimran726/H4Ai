import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  cover_image: z.string().optional(),
  is_published: z.boolean().default(false),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  seo_schema: z.string().optional(),
});

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Blog GET error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = blogSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.format() }, { status: 400 });
    }
    
    const data = result.data;
    
    const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newBlog = await prisma.blogPost.create({
      data: {
        ...data,
        published_at: data.is_published ? new Date() : null,
      }
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Blog POST error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
