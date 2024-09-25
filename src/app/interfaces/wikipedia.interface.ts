export interface WikipediaArticle {
    title: string;
    pageid: number;
    snippet: string;
    timestamp: string;
    sectiontitle?: string;
    sectionsnippet?: string;
}