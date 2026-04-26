/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, ShieldAlert, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200"
          >
            <Activity size={24} />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900 border-indigo-600">OncoPredict <span className="text-indigo-600 font-mono text-sm align-top">AI</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
              Diagnostic Support System <ShieldAlert size={10} className="text-indigo-400" />
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Analyzer</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Performance</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-mono text-slate-400">STATUS: ONLINE</span>
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tighter">GEMINI-2.0-FLASH-CONNECTED</span>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md">
            <FlaskConical size={16} />
            Test Lab
          </button>
        </div>
      </div>
    </header>
  );
}
