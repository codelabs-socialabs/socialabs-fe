import { useParams } from 'react-router';
import { useProject } from '@/features/project/hooks';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id!);

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Keyword</p>
            <p className="font-medium">{project.keyword}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Date Range</p>
            <p className="font-medium">
              {project.startDate} → {project.endDate}
            </p>
          </div>
        </div>
      </div>
      {/* AI analytics will go here */}
    </div>
  );
}
