import { Database, Calendar, BarChart3 } from 'lucide-react';
import type { Project } from '@/types/project';

interface ChatHeaderContextProps {
  project?: Project | null;
}

const formatDateRange = (start?: string, end?: string): string => {
  if (!start || !end) return 'All dates';
  try {
    const s = new Date(start).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const e = new Date(end).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${s} - ${e}`;
  } catch {
    return `${start} - ${end}`;
  }
};

const ChatHeaderContext: React.FC<ChatHeaderContextProps> = ({ project }) => {
  const projectName = project?.name ?? 'Current Project';
  const tweetCount =
    project?.crawledTweets ??
    project?.totalTweets ??
    project?.tweetsRetrieved ??
    0;
  const totalTweets = tweetCount ? tweetCount.toLocaleString('en-US') : '0';
  const dateRange = formatDateRange(project?.startDate, project?.endDate);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <Database size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">
          Project: {projectName}
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <BarChart3 size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">
          {totalTweets} Tweets
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
        <Calendar size={14} className="text-slate-500" />
        <span className="text-xs font-medium text-slate-700">{dateRange}</span>
      </div>
    </div>
  );
};

export default ChatHeaderContext;
