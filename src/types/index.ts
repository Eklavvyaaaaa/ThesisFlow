export type CompanyStage = 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Late Stage' | 'Exit';

export interface Company {
  id: string;
  name: string;
  website: string;
  sector: string;
  stage: CompanyStage;
  location: string;
  description: string;
  logo?: string;
}

export interface Signal {
  id: string;
  date: string;
  type: 'Funding' | 'Hiring' | 'Product' | 'Partnership' | 'Other';
  title: string;
  description: string;
}

export interface EnrichmentData {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  derivedSignals: string[];
  sources: {
    url: string;
    timestamp: string;
  }[];
  timestamp: string;
  isSimulated?: boolean;
}

export interface CompanyList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: {
    query?: string;
    sector?: string;
    stage?: string;
    location?: string;
  };
  createdAt: string;
}
