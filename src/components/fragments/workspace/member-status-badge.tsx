import type { WorkspaceMemberStatus } from '@/types/workspace-member';

interface MemberStatusBadgeProps {
  status?: WorkspaceMemberStatus;
}

const MemberStatusBadge = ({ status }: MemberStatusBadgeProps) => {
  if (!status) {
    return <span className="text-xs font-medium text-slate-400">Unknown</span>;
  }

  const isActive = status === 'ACTIVE';

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        isActive ? 'text-slate-600' : 'text-amber-700'
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isActive ? 'bg-emerald-500' : 'bg-amber-500'
        }`}
      />

      {isActive ? 'Active' : 'Pending'}
    </span>
  );
};

export default MemberStatusBadge;
