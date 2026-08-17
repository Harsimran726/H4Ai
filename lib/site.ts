/**
 * Centralized site domain configuration.
 * Standardizes all canonical URLs, sitemaps, OpenGraph, and Schema.org metadata to www.h4ai.in.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h4ai.in';
export const SITE_URL = rawUrl.replace(/^https?:\/\/h4ai\.in/, 'https://www.h4ai.in');
