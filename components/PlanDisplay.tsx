
import React, { useState } from 'react';
import { SEOPlan } from '../types';

interface TabButtonProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, icon, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
      active
        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
        : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
    }`}
  >
    {icon}
    {title}
  </button>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
        copied ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copy
        </>
      )}
    </button>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; className?: string }> = ({ title, children, icon, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 h-full flex flex-col strategy-card ${className}`}>
    <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-bold text-slate-800 tracking-tight">{title}</h3>
      </div>
    </div>
    <div className="p-5 flex-1">{children}</div>
  </div>
);

export const PlanDisplay: React.FC<{ plan: SEOPlan }> = ({ plan }) => {
  const [activeTab, setActiveTab] = useState<'links' | 'reputation' | 'content' | 'optimization'>('links');

  // Shared sub-components for DRY rendering between screen and print
  const LinksSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6 flex flex-col">
        <Card title="Local Guest Post Targets">
           <ul className="space-y-3">
             {plan.Links.GuestPostOpportunities.map((opp, i) => (
               <li key={i} className="text-sm text-slate-700 flex items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm group hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <span className="font-medium">{opp}</span>
                  </div>
                  <div className="no-print"><CopyButton text={opp} /></div>
               </li>
             ))}
           </ul>
        </Card>
        <Card title="Entity (PEN) Strategies">
          <div className="space-y-3">
            {plan.Links.PENLinkSuggestions.map((sug, i) => (
              <div key={i} className="text-sm text-slate-600 border-l-4 border-slate-200 pl-4 py-2 bg-slate-50/50 rounded-r-lg">
                {sug}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-6 flex flex-col">
         <Card title="Partnership Outreach Script">
            {plan.Links.OutreachTemplates.map((template, i) => (
              <div key={i} className="mb-4 last:mb-0 p-4 bg-slate-900 rounded-xl border border-slate-700 relative group overflow-hidden">
                <div className="absolute top-3 right-3 z-10 no-print">
                  <CopyButton text={template} />
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5 no-print">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                   Ready-to-Use Outreach
                </div>
                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">{template}</pre>
              </div>
            ))}
         </Card>
      </div>
    </div>
  );

  const ReputationSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6 flex flex-col">
        <Card title="Review Request Templates">
           {plan.Reputation.ReviewRequestTemplates.map((template, i) => (
             <div key={i} className="mb-4 last:mb-0 p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                  <CopyButton text={template} />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pr-10">{template}</p>
             </div>
           ))}
        </Card>
        <Card title="Social Media Review Reposts">
           <div className="space-y-3">
             {plan.Reputation.SocialMediaRepostText.map((repost, i) => (
               <div key={i} className="group text-sm text-slate-600 bg-white border border-slate-200 p-3 rounded-lg shadow-sm flex items-start justify-between gap-3">
                 <span>{repost}</span>
                 <div className="no-print"><CopyButton text={repost} /></div>
               </div>
             ))}
           </div>
        </Card>
      </div>
      <div className="space-y-6 flex flex-col">
        <Card title="Negative Response Handling">
           {plan.Reputation.NegativeReviewResponseTemplates.map((template, i) => (
             <div key={i} className="mb-4 last:mb-0 p-4 bg-red-50/50 rounded-lg border border-red-100 relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                  <CopyButton text={template} />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic pr-10">"{template}"</p>
             </div>
           ))}
        </Card>
        <Card title="Building Local Trust">
           <ul className="space-y-2">
             {plan.Reputation.Strategies.map((strat, i) => (
               <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                 <span className="text-blue-500 mt-1 font-bold">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                 </span>
                 {strat}
               </li>
             ))}
           </ul>
        </Card>
      </div>
    </div>
  );

  const ContentSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6 flex flex-col">
        <Card title="Google Business Profile Posts">
          {plan.Content.GBPPosts.map((post, i) => (
            <div key={i} className="mb-6 last:mb-0 p-4 bg-blue-50/50 rounded-lg border border-blue-100 relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                <CopyButton text={post.Text} />
              </div>
              <p className="text-slate-800 italic mb-3 pr-10">"{post.Text}"</p>
              <div className="text-xs text-slate-500 space-y-2 pt-2 border-t border-blue-100">
                <p><strong className="text-slate-700">Media Tip:</strong> {post.SuggestedMedia}</p>
                <p><strong className="text-slate-700">Keywords:</strong> {post.Keywords.join(', ')}</p>
                <p><strong className="text-slate-700">Recommended CTA:</strong> <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold">{post.CTA}</span></p>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Social Media Engagement">
          <ul className="list-disc list-inside space-y-3 text-slate-600">
            {plan.Content.SocialMediaContent.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="space-y-6 flex flex-col">
        <Card title="Blog / Article Ideas">
          {plan.Content.BlogIdeas.map((idea, i) => (
            <div key={i} className="mb-4 last:mb-0 border-l-4 border-blue-500 pl-4 py-1">
              <h4 className="font-bold text-slate-900 mb-1">{idea.Title}</h4>
              <div className="text-xs text-slate-500 mb-2 font-mono">H2s: {idea.H2s.join(' | ')}</div>
              <p className="text-sm text-slate-600 italic">{idea.Relevance}</p>
            </div>
          ))}
        </Card>
        <Card title="On-Page SEO Elements">
          <div className="space-y-4">
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Title Tags</h5>
              <div className="space-y-1">
                {plan.Content.OnPageSEO.TitleTags.map((tag, i) => (
                  <div key={i} className="group flex items-center justify-between text-sm text-blue-700 bg-blue-50 p-2 rounded border border-blue-100">
                    <span>{tag}</span>
                    <div className="no-print"><CopyButton text={tag} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Meta Descriptions</h5>
              <div className="space-y-2">
                {plan.Content.OnPageSEO.MetaDescriptions.map((meta, i) => (
                  <div key={i} className="group text-sm text-slate-600 border border-slate-100 p-3 rounded bg-white relative">
                    <p className="pr-12">{meta}</p>
                    <div className="absolute top-2 right-2 no-print">
                      <CopyButton text={meta} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const OptimizationSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <div className="space-y-6 flex flex-col">
         <Card title="GBP Categories & Services">
            <div className="space-y-4">
              <div>
                <h5 className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Primary Categories</h5>
                <div className="flex flex-wrap gap-2">
                  {plan.GBPOptimization.Categories.map((c, i) => <span key={i} className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">{c}</span>)}
                </div>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Additional Services</h5>
                <div className="flex flex-wrap gap-2">
                  {plan.GBPOptimization.Services.map((s, i) => <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200">{s}</span>)}
                </div>
              </div>
            </div>
         </Card>
         <Card title="Visual Content Optimization">
            <ul className="space-y-3 text-sm text-slate-600">
              {plan.GBPOptimization.PhotoVideoTips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-500 font-bold shrink-0">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
         </Card>
       </div>
       <div className="space-y-6 flex flex-col">
          <Card title="Post Strategy & Keywords">
            <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-blue-800 border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <p className="text-sm font-bold uppercase tracking-wide">Frequency: {plan.GBPOptimization.PostingFrequency}</p>
            </div>
            <div className="space-y-5">
               <div>
                 <h5 className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Monthly Content Calendar</h5>
                 <ul className="text-sm text-slate-600 space-y-2">
                   {plan.GBPOptimization.PostIdeas.map((idea, i) => (
                     <li key={i} className="flex gap-2">
                       <span className="text-slate-300">•</span>
                       {idea}
                     </li>
                   ))}
                 </ul>
               </div>
               <div>
                 <h5 className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Local Target Keywords</h5>
                 <div className="flex flex-wrap gap-1.5">
                   {plan.GBPOptimization.KeywordSuggestions.map((kw, i) => <span key={i} className="px-2 py-1 bg-white border border-blue-200 text-blue-600 rounded-md text-[11px] font-bold shadow-sm">{kw}</span>)}
                 </div>
               </div>
            </div>
          </Card>
       </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header section (Both screen and print) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{plan.BusinessName}</h2>
          <p className="text-slate-500">{plan.Category} • {plan.Location}</p>
        </div>
        <div className="flex gap-2 no-print">
           <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Policy Compliant</div>
           <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">GBP Ready</div>
        </div>
      </div>

      {/* Screen Interactive Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden screen-only">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 bg-slate-50/50">
          <TabButton
            title="Links (70%)"
            active={activeTab === 'links'}
            onClick={() => setActiveTab('links')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
          />
          <TabButton
            title="Reputation (20%)"
            active={activeTab === 'reputation'}
            onClick={() => setActiveTab('reputation')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>}
          />
          <TabButton
            title="Content (10%)"
            active={activeTab === 'content'}
            onClick={() => setActiveTab('content')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
          />
          <TabButton
            title="GBP Optimization"
            active={activeTab === 'optimization'}
            onClick={() => setActiveTab('optimization')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M12 16h.01"/><path d="M16 12h.01"/><path d="M12 12h.01"/><path d="M8 12h.01"/><path d="M12 8h.01"/><path d="M16 4h.01"/><path d="M12 4h.01"/><path d="M8 4h.01"/></svg>}
          />
        </div>

        <div className="p-6">
          {activeTab === 'links' && <LinksSection />}
          {activeTab === 'reputation' && <ReputationSection />}
          {activeTab === 'content' && <ContentSection />}
          {activeTab === 'optimization' && <OptimizationSection />}
        </div>
      </div>

      {/* Print-Only Comprehensive View */}
      <div className="print-only space-y-12">
        <div>
          <h2 className="text-xl font-bold border-b-2 border-blue-600 mb-6 pb-2">1. Local Link Building & Entity Authority (70%)</h2>
          <LinksSection />
        </div>
        <div className="page-break">
          <h2 className="text-xl font-bold border-b-2 border-blue-600 mb-6 pb-2">2. Reputation Management & Trust (20%)</h2>
          <ReputationSection />
        </div>
        <div className="page-break">
          <h2 className="text-xl font-bold border-b-2 border-blue-600 mb-6 pb-2">3. Strategic Content Foundation (10%)</h2>
          <ContentSection />
        </div>
        <div className="page-break">
          <h2 className="text-xl font-bold border-b-2 border-blue-600 mb-6 pb-2">4. GBP Advanced Optimization</h2>
          <OptimizationSection />
        </div>
      </div>
    </div>
  );
};
