
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { generateSEOPlan } from './services/geminiService';
import { UserInput, SEOPlan } from './types';
import { PlanDisplay } from './components/PlanDisplay';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserInput>({
    businessName: '',
    businessCategory: '',
    location: '',
    websiteUrl: '',
    services: ''
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SEOPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.businessName.trim() || !formData.businessCategory.trim() || !formData.location.trim()) {
      setError("Business Name, Category, and Location are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const generatedPlan = await generateSEOPlan(formData);
      if (!generatedPlan || typeof generatedPlan !== 'object') {
        throw new Error("Received an invalid response structure from the AI.");
      }
      setPlan(generatedPlan);
    } catch (err: any) {
      console.error("Plan generation error:", err);
      setError(err.message || "Failed to generate strategy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const handleDownloadData = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!plan) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${plan.BusinessName.replace(/\s+/g, '_')}_SEO_Plan.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4 pt-8 no-print">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl lg:text-6xl">
            Dominating Local Search <br />
            <span className="text-blue-600">Starts Here.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Generate a full Local SEO strategy, 100% compliant with Google Business Profile policies.
          </p>
        </section>

        {!plan && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-in fade-in zoom-in duration-500 no-print">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Business Name *</label>
                <input
                  required
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Blue Ribbon Bakery"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Category *</label>
                <input
                  required
                  type="text"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleChange}
                  placeholder="e.g. Artisan Bakery"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Location (City, Area) *</label>
                <input
                  required
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Brooklyn, NY"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Website URL (Optional)</label>
                <input
                  type="text"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Services / Specialties (Optional)</label>
                <textarea
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List your core services or specific niche keywords..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50"
                />
              </div>

              {error && (
                <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-3">
                  <div className="bg-red-200 p-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <span className="font-semibold">{error}</span>
                </div>
              )}

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
                    loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      Build Expert Strategy
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {plan && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 no-print">
              <button
                type="button"
                onClick={() => setPlan(null)}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 group transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                New Strategy
              </button>
              <div className="flex gap-2">
                <button
                   type="button"
                   onClick={handleDownloadData}
                   className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 border border-slate-200"
                   title="Download plan as JSON file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Data
                </button>
                <button
                   type="button"
                   onClick={handlePrint}
                   className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                  Export PDF / Print
                </button>
              </div>
            </div>
            <PlanDisplay plan={plan} />
          </div>
        )}

        {!plan && !loading && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 no-print">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 font-black text-2xl">70%</div>
              <h3 className="font-extrabold text-slate-900 mb-3 text-xl">PEN Links</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">Proximity, Entity, and Niche link suggestions to build authority in your specific territory.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 font-black text-2xl">20%</div>
              <h3 className="font-extrabold text-slate-900 mb-3 text-xl">Reputation</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">Templates for review acquisition and negative feedback management without policy risk.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-black text-2xl">10%</div>
              <h3 className="font-extrabold text-slate-900 mb-3 text-xl">Content & GBP</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">Focused hyper-local content and metadata strategy to support your link-building foundation.</p>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default App;
