'use client';

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    try {
        return JSON.parse(stored) as T;
    } catch (e) {
        console.error(`Error parsing storage key "${key}":`, e);
        return defaultValue;
    }
};

export const setToStorage = <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving to storage key "${key}":`, e);
    }
};

export const STORAGE_KEYS = {
    LISTS: 'vc_lists',
    SAVED_SEARCHES: 'vc_saved_searches',
    NOTES_PREFIX: 'vc_notes_',
    CACHED_ENRICHMENT_PREFIX: 'vc_enrich_',
    SAVED_COMPANIES: 'vc_saved_companies',
};
