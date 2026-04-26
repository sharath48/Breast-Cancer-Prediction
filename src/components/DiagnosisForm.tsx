/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FEATURE_INFO } from '../constants';
import { DiagnosticMeasurements } from '../types';
import { Calculator, RotateCcw, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onPredict: (data: DiagnosticMeasurements) => void;
  isLoading: boolean;
}

const INITIAL_STATE: DiagnosticMeasurements = {
  radius_mean: 14.1,
  texture_mean: 19.3,
  perimeter_mean: 92.0,
  area_mean: 654.8,
  smoothness_mean: 0.096,
  compactness_mean: 0.104,
  concavity_mean: 0.088,
  concave_points_mean: 0.048,
  symmetry_mean: 0.181,
  fractal_dimension_mean: 0.062,
};

export default function DiagnosisForm({ onPredict, isLoading }: Props) {
  const [formData, setFormData] = useState<DiagnosticMeasurements>(INITIAL_STATE);

  const handleChange = (key: keyof DiagnosticMeasurements, value: number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setFormData(INITIAL_STATE);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-12rem)]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calculator size={20} className="text-indigo-600" />
            Tumor Parameters
          </h2>
          <p className="text-sm text-slate-500">Adjust mean measurements from biopsy images</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Reset to defaults"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <div className="grid grid-cols-1 gap-6">
          {FEATURE_INFO.map((info, idx) => (
            <motion.div 
              key={info.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="group"
            >
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-semibold text-slate-700 flex flex-col">
                  {info.label}
                  <span className="text-[10px] font-normal text-slate-400 uppercase tracking-tight">{info.desc}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-mono font-bold text-indigo-600">
                    {formData[info.key].toFixed(info.step < 0.1 ? 3 : 1)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{info.unit}</span>
                </div>
              </div>
              <input
                type="range"
                min={info.min}
                max={info.max}
                step={info.step}
                value={formData[info.key]}
                onChange={(e) => handleChange(info.key, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/30 shrink-0">
        <button
          onClick={() => onPredict(formData)}
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing Core Data...
            </div>
          ) : (
            <>
              <Play size={18} className="group-hover:translate-x-1 transition-transform" />
              Execute Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
}
