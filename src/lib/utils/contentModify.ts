import { decode } from 'he';

// Helper function to generate excerpt
export function createExcerpt(htmlContent: string | null | undefined, wordLimit = 10): string {
    if (!htmlContent) return "Chưa có tóm tắt";
    // Strip HTML tags and decode HTML entities
    const textContent = decode(htmlContent.replace(/<[^>]*>/g, ''));
    // Split into words, take the limit, join back, add ellipsis
    const words = textContent.split(/\s+/).filter(Boolean); // Split by whitespace and remove empty strings
    if (words.length === 0) return "Chưa có tóm tắt";
    const truncated = words.slice(0, wordLimit).join(' ');
    return words.length > wordLimit ? `${truncated}...` : truncated;
  }