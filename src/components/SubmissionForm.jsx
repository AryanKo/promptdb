import { useState } from 'react';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setStatus('error');
      setErrorMessage('Please wait a few seconds before submitting again.');
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    const parsedTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const response = await fetch('/api/submitPrompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: parsedTags,
        }),
      });

      if (!response.ok) {
        let errStr = 'Submission failed';
        try {
           const errorData = await response.json();
           if(errorData.error) errStr = errorData.error;
        } catch(e) {}
        throw new Error(errStr);
      }

      setStatus('success');
      setLastSubmitTime(Date.now());
      setFormData({ title: '', description: '', content: '', tags: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-white mb-4">Submit a New Prompt</h2>
      
      {status === 'success' && (
        <div className="mb-4 p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={20} className="flex-shrink-0" />
          <p className="text-sm font-medium">Prompt submitted successfully! It will be reviewed shortly.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} className="flex-shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            placeholder="e.g. React Component Generator"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            placeholder="What does this prompt do?"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-1">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
            placeholder="react, frontend, code (comma separated)"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">
            Full Prompt Content <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            id="content"
            name="content"
            rows={5}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow font-mono text-sm"
            placeholder="Write the full system instruction..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">Submitting...</span>
          ) : (
            <>
              Submit Prompt <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
