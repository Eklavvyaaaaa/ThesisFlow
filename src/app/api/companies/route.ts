import { NextResponse } from 'next/server';
import { fetchProductHuntCompanies } from '@/lib/producthunt';

export async function GET() {
    try {
        const companies = await fetchProductHuntCompanies();
        return NextResponse.json({ companies, source: 'producthunt' });
    } catch (error) {
        console.error('ProductHunt fetch failed:', error);
        return NextResponse.json(
            { error: 'Failed to fetch companies', companies: [] },
            { status: 500 }
        );
    }
}
