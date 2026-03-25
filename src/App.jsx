import { useState, useMemo } from 'react';
import PromptCard from './components/PromptCard';
import SearchBar from './components/SearchBar';
import SubmissionForm from './components/SubmissionForm';
import { getSearchResults } from './utils/search';
import initialPrompts from './data/prompts.json';
import { Database } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const displayedPrompts = useMemo(() => {
    return getSearchResults(initialPrompts, searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-slate-900 text-cyan-400 rounded-2xl shadow-sm border border-slate-800">
              <Database size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Prompt Library
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            A curated collection of system instructions, persona frameworks, and creative prompts.
          </p>
        </div>

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Prompts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? 'Search Results' : 'All Prompts'}
            </h2>
            <span className="text-sm font-medium text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {displayedPrompts.length} {displayedPrompts.length === 1 ? 'result' : 'results'}
            </span>
          </div>
          
          {displayedPrompts.length > 0 ? (
            <div className="grid gap-6">
              {displayedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
              <p className="text-slate-400 font-medium text-lg">No prompts found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <div className="pt-8 border-t border-slate-800">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">Contribute</h2>
              <p className="mt-2 text-slate-400">Have a great prompt? Submit it for review to be added to the library.</p>
            </div>
            <SubmissionForm />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
