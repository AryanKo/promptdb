import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-2xl leading-5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm shadow-sm transition-shadow focus:shadow-md"
        placeholder="Search prompts by keyword, description, or tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
