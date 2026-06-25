import { useState } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Shield } from 'lucide-react';
import { useChangePassword, useDeleteAccount } from '@/features/auth/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';
import { useWorkspaces } from '@/features/workspace/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function AccountSettingsPage() {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const { data: workspaces } = useWorkspaces();
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteAccount();

  const workspaceExists = workspaces?.some((w) => w._id === activeWorkspaceId);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  if (!activeWorkspaceId || !workspaceExists) {
    return <Navigate to="/app" replace />;
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          toast.success('Password changed');
        },
        onError: () =>
          toast.error(
            'Failed to change password. Check your current password.',
          ),
      },
    );
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE') return;
    deleteAccount.mutate(undefined, {
      onSuccess: () => toast.success('Account deleted'),
      onError: () => toast.error('Failed to delete account'),
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-slate-600 mt-1" />
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {changePassword.isError && (
              <p className="text-sm text-red-600">
                Failed to change password. Check your current password.
              </p>
            )}

            <Button
              type="submit"
              disabled={
                changePassword.isPending ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
            >
              {changePassword.isPending ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border border-red-200">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Trash2 size={20} className="text-red-600 mt-1" />
            <div>
              <CardTitle className="text-red-700">Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all data
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            This action cannot be undone. All your workspaces, projects, and
            data will be permanently deleted.
          </p>
          <div className="flex items-center gap-3">
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder='Type "DELETE" to confirm'
              className="flex-1"
            />
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== 'DELETE' || deleteAccount.isPending}
            >
              {deleteAccount.isPending ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
