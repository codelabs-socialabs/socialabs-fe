import React from 'react';
import {
  Mic2,
  Repeat2,
  MessageCircle,
  Network,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import type { InfluencerBuzzer } from '@/types/project';

interface InfluencerRankingTableProps {
  data?: InfluencerBuzzer[];
}

const InfluencerRankingTable: React.FC<InfluencerRankingTableProps> = ({
  data = [],
}) => {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Originator':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
            <Mic2 size={12} /> Originator
          </span>
        );
      case 'Amplifier':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
            <Repeat2 size={12} /> Amplifier
          </span>
        );
      case 'Engager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
            <MessageCircle size={12} /> Engager
          </span>
        );
      case 'Bridge':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-50 text-purple-600 border border-purple-100">
            <Network size={12} /> Bridge
          </span>
        );
      default:
        return null;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-emerald-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Top Structural Influencers
          </h3>
          <p className="text-sm font-medium text-slate-500">
            Ranking based on network impact, not just raw follower count.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="p-4 pl-8">Account</th>
              <th className="p-4">Influence Score</th>
              <th className="p-4">Role Classification</th>
              <th className="p-4">Est. Followers</th>
              <th className="p-4">Avg. Engagement</th>
              <th className="p-4">Dominant Topic</th>
              <th className="p-4 pr-8 text-center">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-sm font-medium text-slate-500"
                >
                  No influencer data available.
                </td>
              </tr>
            ) : (
              data.map((inf, index) => {
                const username = inf.username.startsWith('@')
                  ? inf.username
                  : `@${inf.username}`;
                const followers = inf.followers ?? 0;
                const engagementRate = inf.engagementRate ?? 0;
                const dominantTopic = inf.dominantTopic ?? 'General';
                const avatarUrl = `https://i.pravatar.cc/150?u=${encodeURIComponent(
                  inf.username,
                )}`;

                return (
                  <tr
                    key={inf.id || inf.username || index}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="p-4 pl-8">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-bold text-slate-400 w-4">
                          {inf.rank || index + 1}
                        </div>
                        <img
                          src={avatarUrl}
                          alt={username}
                          className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
                        />
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {username}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
                          <span className="font-black text-white">
                            {inf.influenceScore}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(inf.role)}</td>
                    <td className="p-4 font-semibold text-slate-600 text-sm">
                      {followers >= 1000000
                        ? (followers / 1000000).toFixed(1) + 'M'
                        : followers >= 1000
                          ? (followers / 1000).toFixed(1) + 'K'
                          : followers}
                    </td>
                    <td className="p-4 font-semibold text-slate-600 text-sm">
                      {engagementRate}%
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                        {dominantTopic}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-center flex justify-center">
                      {getTrendIcon()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfluencerRankingTable;
