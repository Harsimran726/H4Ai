import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  cover_image: z.string().optional(),
  is_published: z.boolean(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  seo_schema: z.string().optional(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blog = await prisma.blogPost.findUnique({ where: { id } });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = blogSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: {
        ...result.data,
        published_at: result.data.is_published && !existing.is_published ? new Date() : existing.published_at,
      }
    });

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
