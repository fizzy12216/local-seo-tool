
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SEOPlan } from "../types";

// Helper to get the AI instance, ensuring it uses the injected API key.
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined. Please set it in your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSEOPlan = async (input: UserInput): Promise<SEOPlan> => {
  const ai = getAI();
  
  const prompt = `
    You are an expert Local SEO strategist. Generate a full Local SEO content and optimization plan for the following business:
    Business Name: ${input.businessName}
    Category: ${input.businessCategory}
    Location: ${input.location}
    ${input.websiteUrl ? `Website: ${input.websiteUrl}` : ""}
    ${input.services ? `Services/Specialties: ${input.services}` : ""}

    CRITICAL COMPLIANCE RULES:
    1. NEVER include phone numbers in text (suggest using the GBP "Call Now" button instead).
    2. No fake or incentivized reviews.
    3. No social media links, shorteners, or messaging app links in the GBP post content.
    4. Focus on topical relevance and local geo-targeting.
    5. Ensure all suggestions are realistic and follow Google Business Profile policies.
    6. NEW BUSINESS WEIGHTAGE: 70% Links (PEN & Local Authority), 20% Reputation, 10% Content/GBP Optimization. 
       Ensure the Links section is extremely detailed, providing specific, high-value local outreach targets and entity-building strategies.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          BusinessName: { type: Type.STRING },
          Category: { type: Type.STRING },
          Location: { type: Type.STRING },
          Reputation: {
            type: Type.OBJECT,
            properties: {
              ReviewRequestTemplates: { type: Type.ARRAY, items: { type: Type.STRING } },
              NegativeReviewResponseTemplates: { type: Type.ARRAY, items: { type: Type.STRING } },
              SocialMediaRepostText: { type: Type.ARRAY, items: { type: Type.STRING } },
              Strategies: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["ReviewRequestTemplates", "NegativeReviewResponseTemplates", "SocialMediaRepostText", "Strategies"]
          },
          Content: {
            type: Type.OBJECT,
            properties: {
              GBPPosts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    Text: { type: Type.STRING },
                    SuggestedMedia: { type: Type.STRING },
                    Keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    CTA: { type: Type.STRING }
                  },
                  required: ["Text", "SuggestedMedia", "Keywords", "CTA"]
                }
              },
              BlogIdeas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    Title: { type: Type.STRING },
                    H2s: { type: Type.ARRAY, items: { type: Type.STRING } },
                    Relevance: { type: Type.STRING }
                  },
                  required: ["Title", "H2s", "Relevance"]
                }
              },
              OnPageSEO: {
                type: Type.OBJECT,
                properties: {
                  TitleTags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  H2Headings: { type: Type.ARRAY, items: { type: Type.STRING } },
                  MetaDescriptions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["TitleTags", "H2Headings", "MetaDescriptions"]
              },
              SocialMediaContent: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["GBPPosts", "BlogIdeas", "OnPageSEO", "SocialMediaContent"]
          },
          Links: {
            type: Type.OBJECT,
            properties: {
              GuestPostOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              OutreachTemplates: { type: Type.ARRAY, items: { type: Type.STRING } },
              PENLinkSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["GuestPostOpportunities", "OutreachTemplates", "PENLinkSuggestions"]
          },
          GBPOptimization: {
            type: Type.OBJECT,
            properties: {
              Categories: { type: Type.ARRAY, items: { type: Type.STRING } },
              Services: { type: Type.ARRAY, items: { type: Type.STRING } },
              PostIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
              PhotoVideoTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              KeywordSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              PostingFrequency: { type: Type.STRING }
            },
            required: ["Categories", "Services", "PostIdeas", "PhotoVideoTips", "KeywordSuggestions", "PostingFrequency"]
          }
        },
        required: ["BusinessName", "Category", "Location", "Reputation", "Content", "Links", "GBPOptimization"]
      }
    }
  });

  try {
    const text = response.text || "";
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse SEO plan response:", error);
    throw new Error("Invalid response format from Gemini API");
  }
};
