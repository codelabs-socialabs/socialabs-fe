import { Database, Calendar, BarChart3 } from 'lucide-react';

const ChatHeaderContext = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <Database size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">
          Project: Acme Corp
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <BarChart3 size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">
          35,420 Tweets
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <Calendar size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">
          Jan 1 - Mar 31
        </span>
      </div>
    </div>
  );
};

export default ChatHeaderContext;
