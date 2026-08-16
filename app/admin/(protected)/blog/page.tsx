"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    if (res.ok) {
      const data = await res.json();
      setBlogs(data.blogs);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchBlogs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-sora font-semibold text-foreground">Blog Manager</h2>
          <p className="text-muted-foreground mt-1">Manage, write, and optimize your blog posts.</p>
        </div>
        <Link href="/admin/blog/editor">
          <Button className="gap-2"><Plus className="w-4 h-4" /> New Post</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : blogs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No blog posts found. Create one!</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 pt-4 first:pt-0">
                  <div>
                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">/{blog.slug} • {format(new Date(blog.created_at), "MMM d, yyyy")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${blog.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                    <Link href={`/admin/blog/editor?id=${blog.id}`}>
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => deleteBlog(blog.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
