import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function PromptCard({ prompt }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg shadow-black/20 hover:border-slate-700 transition-all duration-200">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-lg text-white">{prompt.title}</h3>
          <p className="text-slate-400 mt-1 text-sm">{prompt.description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors flex-shrink-0"
          title="Copy prompt"
        >
          {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none"
        >
          {expanded ? (
            <>Hide Prompt <ChevronUp size={16} /></>
          ) : (
            <>View Prompt <ChevronDown size={16} /></>
          )}
        </button>
        
        {expanded && (
          <div className="mt-3 relative">
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap border border-slate-800 selection:bg-cyan-500/30 max-h-96 overflow-y-auto custom-scrollbar">
              {prompt.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
