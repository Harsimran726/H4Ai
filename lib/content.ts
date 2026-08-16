import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');
const blogDirectory = path.join(contentDirectory, 'blog');
const locationsDirectory = path.join(contentDirectory, 'locations');

export interface ContentData {
  id: string;
  contentHtml?: string;
  [key: string]: any;
}

export async function getSortedPostsData(): Promise<ContentData[]> {
  if (!fs.existsSync(blogDirectory)) return [];
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    };
  });
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export async function getPostData(id: string): Promise<ContentData | null> {
  const fullPath = path.join(blogDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}

export async function getAllLocationIds(): Promise<string[]> {
  if (!fs.existsSync(locationsDirectory)) return [];
  const fileNames = fs.readdirSync(locationsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getLocationData(id: string): Promise<ContentData | null> {
  const fullPath = path.join(locationsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}

export async function getAllLocationsData(): Promise<ContentData[]> {
  if (!fs.existsSync(locationsDirectory)) return [];
  const fileNames = fs.readdirSync(locationsDirectory);
  const allData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(locationsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data
    };
  });
  // Sort alphabetically by city name (or priority)
  return allData.sort((a: any, b: any) => {
    const titleA = a.title || '';
    const titleB = b.title || '';
    return titleA.localeCompare(titleB);
  });
}
