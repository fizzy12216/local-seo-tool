
export interface GBPPost {
  Text: string;
  SuggestedMedia: string;
  Keywords: string[];
  CTA: string;
}

export interface BlogIdea {
  Title: string;
  H2s: string[];
  Relevance: string;
}

export interface OnPageSEO {
  TitleTags: string[];
  H2Headings: string[];
  MetaDescriptions: string[];
}

export interface ReputationData {
  ReviewRequestTemplates: string[];
  NegativeReviewResponseTemplates: string[];
  SocialMediaRepostText: string[];
  Strategies: string[];
}

export interface ContentData {
  GBPPosts: GBPPost[];
  BlogIdeas: BlogIdea[];
  OnPageSEO: OnPageSEO;
  SocialMediaContent: string[];
}

export interface LinkData {
  GuestPostOpportunities: string[];
  OutreachTemplates: string[];
  PENLinkSuggestions: string[];
}

export interface GBPOptimizationData {
  Categories: string[];
  Services: string[];
  PostIdeas: string[];
  PhotoVideoTips: string[];
  KeywordSuggestions: string[];
  PostingFrequency: string;
}

export interface SEOPlan {
  BusinessName: string;
  Category: string;
  Location: string;
  Reputation: ReputationData;
  Content: ContentData;
  Links: LinkData;
  GBPOptimization: GBPOptimizationData;
}

export interface UserInput {
  businessName: string;
  businessCategory: string;
  location: string;
  websiteUrl?: string;
  services?: string;
}
