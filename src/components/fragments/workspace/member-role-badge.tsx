import type { WorkspaceMemberRole } from '@/types/workspace-member';

interface MemberRoleBadgeProps {
  role?: WorkspaceMemberRole;
}

const roleStyles: Record<WorkspaceMemberRole, string> = {
  OWNER: 'bg-violet-50 text-violet-700 ring-violet-600/10',
  ADMIN: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  ANALYST: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  VIEWER: 'bg-slate-100 text-slate-600 ring-slate-500/10',
};

const roleLabels: Record<WorkspaceMemberRole, string> = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  ANALYST: 'Analyst',
  VIEWER: 'Viewer',
};

const MemberRoleBadge = ({ role }: MemberRoleBadgeProps) => {
  if (!role) {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10">
        Unknown
      </span>
    );
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${roleStyles[role]}`}
    >
      {roleLabels[role]}
    </span>
  );
};

export default MemberRoleBadge;
