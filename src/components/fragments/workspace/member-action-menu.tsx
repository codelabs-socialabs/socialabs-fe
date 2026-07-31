import { Mail, MoreHorizontal, Trash2, UserCog, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useWorkspaceMemberStore } from '@/stores/workspace-member-store';
import type {
  WorkspaceMember,
  WorkspaceMemberRole,
} from '@/types/workspace-member';

interface MemberActionMenuProps {
  member: WorkspaceMember;
}

const editableRoles: Array<{
  label: string;
  value: Exclude<WorkspaceMemberRole, 'OWNER'>;
}> = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'Analyst',
    value: 'ANALYST',
  },
  {
    label: 'Viewer',
    value: 'VIEWER',
  },
];

const MemberActionMenu = ({ member }: MemberActionMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState<boolean>(false);

  const updateMemberRole = useWorkspaceMemberStore(
    (state) => state.updateMemberRole,
  );

  const removeMember = useWorkspaceMemberStore((state) => state.removeMember);

  const resendInvitation = useWorkspaceMemberStore(
    (state) => state.resendInvitation,
  );

  const cancelInvitation = useWorkspaceMemberStore(
    (state) => state.cancelInvitation,
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsRoleMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  if (member.role === 'OWNER') {
    return (
      <button
        type="button"
        disabled
        aria-label="Owner actions unavailable"
        className="rounded-lg p-2 text-slate-300"
      >
        <MoreHorizontal size={18} />
      </button>
    );
  }

  const handleRoleChange = (
    role: Exclude<WorkspaceMemberRole, 'OWNER'>,
  ): void => {
    updateMemberRole({
      memberId: member.id,
      role,
    });

    setIsOpen(false);
    setIsRoleMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          setIsRoleMenuOpen(false);
        }}
        aria-label={`Open actions for ${member.email}`}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-1.5 w-52 rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg">
          {member.status === 'ACTIVE' ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleMenuOpen((current) => !current)}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <UserCog size={15} className="text-slate-400" />
                  Change role
                </button>

                {isRoleMenuOpen && (
                  <div className="mx-2 mb-1 rounded-md bg-slate-50 p-1">
                    {editableRoles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        disabled={role.value === member.role}
                        onClick={() => handleRoleChange(role.value)}
                        className="flex w-full rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-default disabled:bg-white disabled:text-red-600"
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => {
                  removeMember(member.id);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
                Remove member
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  resendInvitation(member.id);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Mail size={15} className="text-slate-400" />
                Resend invitation
              </button>

              <button
                type="button"
                onClick={() => {
                  cancelInvitation(member.id);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <XCircle size={15} />
                Cancel invitation
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberActionMenu;
