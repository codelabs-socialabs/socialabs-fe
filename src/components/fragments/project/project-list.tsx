import { Folder } from 'lucide-react';

import type { Project } from '@/types/project';

import ProjectCard from './project-card';

interface ProjectListProps {
  projects: Project[];
  onCreateProject: () => void;
}

const ProjectList = ({ projects, onCreateProject }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-28 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
          <Folder size={24} className="text-slate-400" />
        </div>

        <h2 className="text-base font-semibold text-slate-900">
          No projects yet
        </h2>

        <p className="mb-6 mt-1.5 max-w-sm text-sm leading-relaxed text-slate-500">
          Create your first research project to start collecting data and
          generating AI-powered insights.
        </p>

        <button
          type="button"
          onClick={onCreateProject}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Create Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
