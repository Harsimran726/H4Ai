import 'dotenv/config';
import { prisma } from '../lib/db';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

async function main() {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  
  if (!fs.existsSync(contentDir)) {
    console.log("No content/blog directory found to migrate.");
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { data, content } = matter(raw);

    try {
      await prisma.blogPost.upsert({
        where: { slug },
        update: {},
        create: {
          title: data.title || slug,
          slug,
          content,
          excerpt: data.description || '',
          seo_title: data.title,
          seo_description: data.description,
          is_published: true,
          published_at: data.date ? new Date(data.date) : new Date(),
        }
      });
      console.log(`Migrated blog: ${slug}`);
    } catch (e) {
      console.error(`Failed to migrate ${slug}:`, e);
    }
  }

  console.log("Blog migration complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
