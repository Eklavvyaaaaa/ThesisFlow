import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, companyId } = body;

        // 2. Validate the URL
        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }

        // 3. Use Firecrawl to scrape the company website
        const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                formats: ['markdown'],
                onlyMainContent: true
            })
        });

        if (!scrapeResponse.ok) {
            return NextResponse.json({ error: 'Failed to scrape website' }, { status: 500 });
        }

        const scrapeData = await scrapeResponse.json();
        const pageContent = scrapeData.data?.markdown || '';

        if (!pageContent) {
            return NextResponse.json({ error: 'No content found at URL' }, { status: 500 });
        }

        // 4. Send the scraped content to Groq using the groq SDK
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content: 'You are a VC analyst. Always respond with valid JSON only. No markdown, no explanation, no code blocks. Just raw JSON.'
                },
                {
                    role: 'user',
                    content: `Based on this company website content, extract and return ONLY this JSON structure:
{
  "summary": "1-2 sentence overview of what the company does",
  "whatTheyDo": ["bullet point 1", "bullet point 2", "bullet point 3", "bullet point 4"],
  "keywords": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "signals": ["signal inferred from content 1", "signal 2", "signal 3"]
}

Website content:
${pageContent.slice(0, 6000)}`
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
            max_tokens: 1000,
        });

        // 5. Parse Groq's response safely
        const rawText = completion.choices[0]?.message?.content || '';

        let parsed;
        try {
            // Because we used response_format: 'json_object', it should be perfectly clean
            parsed = JSON.parse(rawText);
        } catch (e) {
            console.error("Failed to parse Groq response:", rawText);
            return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
        }

        // 6. Return the final response
        return NextResponse.json({
            summary: parsed.summary || '',
            whatTheyDo: parsed.whatTheyDo || [],
            keywords: parsed.keywords || [],
            signals: parsed.signals || [],
            derivedSignals: parsed.signals || [], // Frontend expects derivedSignals for the timeline
            timestamp: new Date().toISOString(), // Frontend strictly expects timestamp
            sources: [
                {
                    url: url,
                    scrapedAt: new Date().toISOString()
                }
            ]
        });

    } catch (error) {
        // 7. Wrap everything in a try/catch
        return NextResponse.json({ error: 'Enrichment failed' }, { status: 500 });
    }
}
