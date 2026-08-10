import { Search, UserPlus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import InviteMemberModal from '@/components/fragments/workspace/invite-member-modal';
import MemberActionMenu from '@/components/fragments/workspace/member-action-menu';
import MemberRoleBadge from '@/components/fragments/workspace/member-role-badge';
import MemberStatusBadge from '@/components/fragments/workspace/member-status-badge';
import { useWorkspaceMemberStore } from '@/stores/workspace-member-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import type {
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from '@/types/workspace-member';

interface WorkspaceRouteParams {
  workspaceId: string;
}

type RoleFilter = 'ALL' | WorkspaceMemberRole;

type StatusFilter = 'ALL' | WorkspaceMemberStatus;

const formatMemberDate = (value?: string): string => {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const WorkspaceMembersPage = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const allMembers = useWorkspaceMemberStore((state) => state.members);

  const workspace = useMemo(
    () => workspaces.find((item) => item.id === workspaceId),
    [workspaceId, workspaces],
  );

  const members = useMemo(() => {
    if (!workspaceId) {
      return [];
    }

    return allMembers.filter((member) => member.workspaceId === workspaceId);
  }, [allMembers, workspaceId]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        member.name?.toLowerCase().includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch);

      const matchesRole = roleFilter === 'ALL' || member.role === roleFilter;

      const matchesStatus =
        statusFilter === 'ALL' || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, roleFilter, searchQuery, statusFilter]);

  if (!workspaceId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  const activeMembers = members.filter((member) => member.status === 'ACTIVE');

  const pendingMembers = members.filter(
    (member) => member.status === 'PENDING',
  );

  const ownerCount = members.filter((member) => member.role === 'OWNER').length;

  const adminCount = members.filter((member) => member.role === 'ADMIN').length;

  if (workspace.isPersonal) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Team Members
          </h1>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            Manage people and access in this workspace.
          </p>
        </header>

        <section className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Users size={22} />
          </div>

          <h2 className="mt-4 text-base font-semibold text-slate-950">
            This is your personal workspace
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Personal workspaces are intended for individual research. Create a
            team workspace when you want to collaborate with other people.
          </p>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Workspace
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Team Members
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-500">
              Manage members, workspace roles, and collaboration access for{' '}
              <span className="font-medium text-slate-700">
                {workspace.name}
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <UserPlus size={16} />
            Invite Member
          </button>
        </header>

        {/* Summary */}
        <section className="mb-8 flex flex-wrap items-center gap-x-10 gap-y-5">
          <div>
            <p className="text-xs font-medium text-slate-400">Active members</p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              {activeMembers.length}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">Owners</p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              {ownerCount}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">Administrators</p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              {adminCount}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Pending invites
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              {pendingMembers.length}
            </p>
          </div>
        </section>

        {/* Main member surface */}
        <section className="overflow-visible rounded-xl border border-slate-200/80 bg-white">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name or email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(event.target.value as RoleFilter)
                }
                className="min-w-36 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
              >
                <option value="ALL">All roles</option>
                <option value="OWNER">Owner</option>
                <option value="ADMIN">Admin</option>
                <option value="ANALYST">Analyst</option>
                <option value="VIEWER">Viewer</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className="min-w-36 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
              >
                <option value="ALL">All status</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden border-t border-slate-100 md:block">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-slate-50/60 text-left">
                  <th className="w-[38%] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Member
                  </th>

                  <th className="w-[16%] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Role
                  </th>

                  <th className="w-[16%] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="w-[22%] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Joined
                  </th>

                  <th className="w-[8%] px-5 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="group transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                          {member.initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {member.name ?? member.email}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <MemberRoleBadge role={member.role} />
                    </td>

                    <td className="px-5 py-4">
                      <MemberStatusBadge status={member.status} />
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600">
                        {member.status === 'ACTIVE'
                          ? formatMemberDate(member.joinedAt)
                          : formatMemberDate(member.invitedAt)}
                      </p>

                      {member.status === 'PENDING' && (
                        <p className="mt-0.5 text-xs text-slate-400">
                          Invitation sent
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <MemberActionMenu member={member} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">
            {filteredMembers.map((member) => (
              <article key={member.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      {member.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {member.name ?? member.email}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <MemberActionMenu member={member} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <MemberRoleBadge role={member.role} />

                  <MemberStatusBadge status={member.status} />

                  <span className="text-xs text-slate-400">
                    {member.status === 'ACTIVE'
                      ? `Joined ${formatMemberDate(member.joinedAt)}`
                      : `Invited ${formatMemberDate(member.invitedAt)}`}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="border-t border-slate-100 px-6 py-16 text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Users size={20} />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-slate-900">
                No members found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          {filteredMembers.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5">
              <p className="text-xs text-slate-400">
                Showing {filteredMembers.length} of {members.length} members
              </p>
            </div>
          )}
        </section>

        {/* Workspace roles */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-950">
              Workspace Roles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Roles control the level of access each member has in this
              workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-7 border-t border-slate-200 pt-7 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-violet-500" />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">Owner</h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Full control over members, projects, workspace settings,
                  billing, and workspace deletion.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">Admin</h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Manage workspace members and projects without ownership or
                  billing access.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Analyst
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Create research projects, process data, and explore analysis
                  results.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-slate-400" />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">Viewer</h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  View project insights without editing data or changing
                  workspace configuration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        workspaceId={workspace.id}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </>
  );
};

export default WorkspaceMembersPage;
