/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MODEL_METRICS, ROC_DATA } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, Target, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Accuracy', value: '96.2%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Precision', value: '0.95', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg AUC', value: '0.98', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Samples Analyzed', value: '569', icon: Activity, color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Metric</span>
            </div>
            <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Comparison Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Ensemble Model Performance</h3>
            <p className="text-sm text-slate-500">Comparative analysis of various classification algorithms</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_METRICS} layout="vertical" margin={{ left: 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 1]} hide />
                <YAxis 
                   dataKey="name" 
                   type="category" 
                   tick={{ fontSize: 10, fontWeight: 500, fill: '#64748b' }}
                   width={120}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="accuracy" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Accuracy" barSize={12} />
                <Bar dataKey="auc" fill="#0ea5e9" radius={[0, 4, 4, 0]} name="AUC Score" barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROC Curve Area Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">ROC Convergence Curve</h3>
              <p className="text-sm text-slate-500">True Positive vs False Positive Rate analysis</p>
            </div>
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">AUC: 0.992</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ROC_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTpr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="fpr" tick={{ fontSize: 10 }} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="tpr" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTpr)" />
                <Line type="monotone" dataKey="fpr" stroke="#cbd5e1" strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detail Metrics Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Model Algorithm</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Precision</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Recall</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">F1-Score</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Reliability Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MODEL_METRICS.map((model, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{model.name}</td>
                <td className="px-6 py-4 text-center font-mono text-sm text-slate-500">{model.precision.toFixed(3)}</td>
                <td className="px-6 py-4 text-center font-mono text-sm text-slate-500">{model.recall.toFixed(3)}</td>
                <td className="px-6 py-4 text-center font-mono text-sm text-slate-500">{model.f1.toFixed(3)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 group-hover:bg-white animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Validated</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
