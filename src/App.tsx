/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import DiagnosisForm from './components/DiagnosisForm';
import ResultView from './components/ResultView';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { DiagnosticMeasurements, PredictionResult } from './types';
import { predictBreastCancer } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Microscope, ShieldCheck, Database, FileText } from 'lucide-react';

type Tab = 'analyzer' | 'performance';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('analyzer');
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async (data: DiagnosticMeasurements) => {
    setIsPredicting(true);
    try {
      const pred = await predictBreastCancer(data);
      setResult(pred);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col medical-grid">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-2xl w-fit mb-8 border border-white">
          <button 
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'analyzer' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Microscope size={18} />
            Diagnostic Analyzer
          </button>
          <button 
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'performance' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutDashboard size={18} />
            Model Performance
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'analyzer' ? (
            <motion.div 
              key="analyzer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 lg:sticky top-24">
                <DiagnosisForm onPredict={handlePredict} isLoading={isPredicting} />
              </div>
              <div className="lg:col-span-7 space-y-8">
                <ResultView result={result} isLoading={isPredicting} />
                
                {/* Information Callouts */}
                {!isPredicting && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Secure Analysis</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Measurements are processed in a secure environment. No patient PII is stored.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                        <Database size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Dataset Origin</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Trained on the UCI Wisconsin Breast Cancer Diagnostic dataset for clinical accuracy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="performance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AnalyticsDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span>© 2026 OncoPredict Systems</span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center gap-1"><FileText size={12} /> Privacy Policy</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-indigo-500">System v4.2.1-stable</span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Mainnet Synced
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
