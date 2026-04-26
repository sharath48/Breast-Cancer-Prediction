/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PredictionResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, ArrowUpRight, ArrowDownRight, Fingerprint } from 'lucide-react';

interface Props {
  result: PredictionResult | null;
  isLoading: boolean;
}

export default function ResultView({ result, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-24 h-24 mb-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Fingerprint size={40} className="text-indigo-400 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Processing Biopsy Data</h3>
        <p className="text-slate-500 mt-2 text-center max-w-xs text-sm">
          Gemini AI is analyzing structural and morphological characteristics to identify malignancy patterns.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Info size={32} className="text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Awaiting Analysis</h3>
        <p className="text-slate-400 text-sm mt-1">Adjust parameters and click "Execute Analysis" to begin.</p>
      </div>
    );
  }

  const isMalignant = result.diagnosis === 'Malignant';

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={result.diagnosis}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Diagnosis Card */}
        <div className={`rounded-2xl p-8 border-2 shadow-xl ${
          isMalignant 
            ? 'bg-rose-50 border-rose-200 shadow-rose-100/50' 
            : 'bg-emerald-50 border-emerald-200 shadow-emerald-100/50'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl ${isMalignant ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {isMalignant ? <AlertTriangle size={36} /> : <CheckCircle2 size={36} />}
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${isMalignant ? 'text-rose-500' : 'text-emerald-500'}`}>
                  Diagnostic Classification
                </span>
                <h2 className={`text-5xl font-black tracking-tighter ${isMalignant ? 'text-rose-900' : 'text-emerald-900'}`}>
                  {result.diagnosis}
                </h2>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 uppercase">Confidence</span>
                    <span className={`text-sm font-mono font-bold ${isMalignant ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 uppercase">Risk Index</span>
                    <span className={`text-sm font-mono font-bold ${isMalignant ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {result.riskScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-48 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/80">
               <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.riskScore}%` }}
                    className={`absolute inset-0 ${isMalignant ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  />
               </div>
               <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                 <span>Baseline</span>
                 <span>Limit</span>
               </div>
            </div>
          </div>
        </div>

        {/* Clinical Reasoning */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            AI Explanatory Reasoning
          </h3>
          <p className="text-slate-600 leading-relaxed italic text-sm border-l-4 border-indigo-100 pl-4 py-1">
            "{result.reasoning}"
          </p>
        </div>

        {/* Significant Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.keyFactors.map((factor, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 p-4 rounded-xl flex gap-4 hover:border-indigo-200 transition-all cursor-default group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                factor.impact === 'High' ? 'bg-rose-50 text-rose-500' : 
                factor.impact === 'Medium' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
              }`}>
                {factor.impact === 'High' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">{factor.factor}</h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    factor.impact === 'High' ? 'bg-rose-100 text-rose-700' : 
                    factor.impact === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{factor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
