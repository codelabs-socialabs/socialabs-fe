import { useState } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { useProfile, useUpdateProfile } from '@/features/auth/hooks';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const { data: workspaces } = useWorkspaces();

  const workspaceExists = workspaces?.some((w) => w._id === activeWorkspaceId);

  const [fullname, setFullname] = useState(profile?.fullname ?? '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber ?? '');
  const [isSaving, setIsSaving] = useState(false);

  if (!activeWorkspaceId || !workspaceExists) {
    return <Navigate to="/app" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateProfile.mutate(
      { fullname, phoneNumber: phoneNumber || undefined },
      {
        onSettled: () => setIsSaving(false),
        onSuccess: () => toast.success('Profile updated'),
        onError: () => toast.error('Failed to update profile'),
      },
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-red-600 text-white text-2xl font-semibold">
                {profile?.fullname?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {profile?.fullname}
              </p>
              <p className="text-sm text-slate-500">{profile?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-fullname">Full Name</Label>
              <Input
                id="profile-fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                minLength={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                value={profile?.email || ''}
                disabled
                className="bg-slate-50 text-slate-500"
              />
              <p className="text-xs text-slate-400">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone Number</Label>
              <Input
                id="profile-phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +62812345678"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSaving || !fullname.trim()}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
