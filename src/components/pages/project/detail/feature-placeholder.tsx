import type { LucideIcon } from 'lucide-react';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  apiEndpoint: string;
}

export default function FeaturePlaceholder({
  title,
  description,
  icon: Icon,
  apiEndpoint,
}: FeaturePlaceholderProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center space-y-4 px-4">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
        <Icon size={28} className="text-red-500" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">{title}</h1>
        <p className="text-sm text-slate-500 max-w-md">{description}</p>
      </div>
      <div className="mt-4 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-left max-w-md w-full">
        <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
          API Endpoint
        </p>
        <code className="text-sm text-slate-700 font-mono">{apiEndpoint}</code>
        <p className="text-xs text-slate-400 mt-2">
          Coming soon — will consume data from FastAPI AI backend.
        </p>
      </div>
    </div>
  );
}
