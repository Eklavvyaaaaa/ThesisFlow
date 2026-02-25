/**
 * Fetches the content of a public website and cleans it for AI processing.
 * Strips HTML tags, styles, and scripts while normalizing whitespace.
 */
export async function fetchAndCleanHtml(url: string, maxChars: number = 15000): Promise<string> {
    try {
        console.log(`Scraping: ${url}`);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; VCIntelligenceBot/1.0; +https://example.com/bot)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            },
            next: { revalidate: 3600 }, // Cache for 1 hour at the fetch level if possible
            signal: AbortSignal.timeout(8000) // 8 second timeout
        });

        if (!response.ok) {
            return `[INACCESSIBLE: ${response.status} ${response.statusText}]`;
        }

        const html = await response.text();

        // Basic HTML cleaning:
        // 1. Remove scripts and styles
        let cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        cleanText = cleanText.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        cleanText = cleanText.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

        // 2. Strip all HTML tags
        cleanText = cleanText.replace(/<[^>]*>?/gm, ' ');

        // 3. Normalize whitespace and newlines
        cleanText = cleanText.replace(/\s+/g, ' ').trim();

        // 4. Limit character count
        return cleanText.substring(0, maxChars) || '[EMPTY CONTENT]';
    } catch (error) {
        console.error('Error fetching/cleaning HTML:', error);
        // Instead of throwing, we return a structural placeholder the API can detect
        return `[INACCESSIBLE: ${error instanceof Error ? error.message : 'Unknown error'}]`;
    }
}
