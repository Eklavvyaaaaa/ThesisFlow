import { NextRequest, NextResponse } from 'next/server';
import { fetchAndCleanHtml } from '@/lib/scraper';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

export async function POST(req: NextRequest) {
    try {
        const { website, companyName, companyDescription } = await req.json();

        if (!website) {
            return NextResponse.json({ error: 'Website URL is required' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error('GROQ_API_KEY is not configured');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        console.log(`Enriching: ${website} (${companyName || 'Unknown'})`);

        // 1. Fetch and clean website content
        let cleanedText = await fetchAndCleanHtml(website);
        let isSimulated = false;

        // Detect inaccessible or empty content
        if (cleanedText.startsWith('[INACCESSIBLE:') || cleanedText === '[EMPTY CONTENT]') {
            console.warn(`Scraper failed for ${website}. Falling back to simulation.`);
            isSimulated = true;
            cleanedText = `The website for ${companyName || 'this company'} is currently inaccessible. Use the available description to simulate a high-fidelity venture intelligence analysis: \n\n ${companyDescription || 'No description available.'}`;
        }

        // 2. Extract intelligence with Groq
        const systemPrompt = `You are a venture capital intelligence analyst. Extract structured startup intelligence from text. 
        
        ${isSimulated ? 'NOTE: The provided text is a fallback description. Perform a "High-Fidelity Simulation" based on this context.' : 'Extract precision signals from the provided website content.'}
        
        Return strictly valid JSON only in this schema:
        {
          "summary": "1-2 sentence summary ${isSimulated ? '(labeled as intelligence projection)' : ''}",
          "what_they_do": ["3-6 technical bullet points"],
          "keywords": ["5-10 keywords"],
          "derived_signals": ["2-4 inferred signals"]
        }
        
        Do not include explanations outside JSON.`;

        const groqResponse = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Context: ${cleanedText}` }
                ],
                temperature: 0.2,
                response_format: { type: 'json_object' }
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            console.error('Groq API error:', errorData);

            if (groqResponse.status === 401) {
                return NextResponse.json({ error: 'Invalid API configuration' }, { status: 500 });
            }
            if (groqResponse.status === 429) {
                return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
            }
            throw new Error(`Groq API returned ${groqResponse.status}`);
        }

        const completion = await groqResponse.json();
        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from Groq API');
        }

        // 3. Parse and structure the response
        let extraction;
        try {
            extraction = JSON.parse(content);
        } catch (parseError) {
            console.error('JSON Parse error:', content);
            return NextResponse.json({ error: 'Failed to parse AI intelligence' }, { status: 500 });
        }

        const structuredResponse = {
            summary: extraction.summary || 'Summary unavailable',
            whatTheyDo: extraction.what_they_do || [],
            keywords: extraction.keywords || [],
            derivedSignals: extraction.derived_signals || [],
            sources: [
                { url: website, timestamp: new Date().toISOString() }
            ],
            timestamp: new Date().toISOString(),
            isSimulated // Flag to indicate if this was a fallback result
        };

        return NextResponse.json(structuredResponse);
    } catch (error) {
        console.error('Enrichment error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Failed to enrich company data'
        }, { status: 500 });
    }
}
