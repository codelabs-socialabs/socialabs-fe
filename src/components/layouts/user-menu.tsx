import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '@/features/auth/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center gap-2 hover:bg-slate-50 rounded-lg p-1.5 border border-transparent hover:border-slate-200 focus:outline-none">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-slate-600 text-white text-xs font-semibold">
              {user?.fullname?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start px-1">
            <span className="text-sm font-medium text-slate-800 leading-none">
              {user?.fullname || 'User'}
            </span>
            <span className="text-[10px] text-slate-500 leading-none">
              {user?.email}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-semibold text-slate-900">
              {user?.fullname || 'User'}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/app/profile" className="flex gap-2">
            <User size={14} className="text-slate-400" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/app/account" className="flex gap-2">
            <Settings size={14} className="text-slate-400" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut size={14} />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
