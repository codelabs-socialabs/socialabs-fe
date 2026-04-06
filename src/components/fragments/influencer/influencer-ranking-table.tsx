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

interface InfluencerData {
  id: string;
  username: string;
  avatarUrl: string;
  influenceScore: number;
  role: 'Originator' | 'Amplifier' | 'Engager' | 'Bridge';
  followers: number;
  engagementRate: number;
  dominantTopic: string;
  trend: 'up' | 'down' | 'flat';
}

const mockInfluencerData: InfluencerData[] = [
  {
    id: '1',
    username: '@dimsum_politik',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    influenceScore: 98,
    role: 'Originator',
    followers: 125000,
    engagementRate: 14.2,
    dominantTopic: 'Kebijakan Publik',
    trend: 'up',
  },
  {
    id: '2',
    username: '@kawal_suara',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    influenceScore: 94,
    role: 'Amplifier',
    followers: 850000,
    engagementRate: 5.8,
    dominantTopic: 'Data Survei',
    trend: 'up',
  },
  {
    id: '3',
    username: '@analis_kota',
    avatarUrl: 'https://i.pravatar.cc/150?u=3',
    influenceScore: 89,
    role: 'Bridge',
    followers: 45000,
    engagementRate: 22.4,
    dominantTopic: 'Infrastruktur',
    trend: 'flat',
  },
  {
    id: '4',
    username: '@suara_rakyat',
    avatarUrl: 'https://i.pravatar.cc/150?u=4',
    influenceScore: 85,
    role: 'Engager',
    followers: 12000,
    engagementRate: 45.1,
    dominantTopic: 'Pendidikan',
    trend: 'up',
  },
  {
    id: '5',
    username: '@politik_update',
    avatarUrl: 'https://i.pravatar.cc/150?u=5',
    influenceScore: 82,
    role: 'Amplifier',
    followers: 1200000,
    engagementRate: 2.1,
    dominantTopic: 'Debat Kandidat',
    trend: 'down',
  },
  {
    id: '6',
    username: '@kampus_bergerak',
    avatarUrl: 'https://i.pravatar.cc/150?u=6',
    influenceScore: 78,
    role: 'Originator',
    followers: 34000,
    engagementRate: 18.9,
    dominantTopic: 'Aksi Mahasiswa',
    trend: 'up',
  },
  {
    id: '7',
    username: '@tengah_jalan',
    avatarUrl: 'https://i.pravatar.cc/150?u=7',
    influenceScore: 75,
    role: 'Bridge',
    followers: 67000,
    engagementRate: 11.2,
    dominantTopic: 'Ekonomi Kerakyatan',
    trend: 'flat',
  },
  {
    id: '8',
    username: '@netizen_aktif',
    avatarUrl: 'https://i.pravatar.cc/150?u=8',
    influenceScore: 71,
    role: 'Engager',
    followers: 5000,
    engagementRate: 55.4,
    dominantTopic: 'Kesehatan',
    trend: 'up',
  },
];

const InfluencerRankingTable: React.FC = () => {
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

  const getTrendIcon = (trend: string) => {
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
        {/* Search / Filter stubs could go here */}
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
            {mockInfluencerData.map((inf, index) => (
              <tr
                key={inf.id}
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
              >
                <td className="p-4 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-slate-400 w-4">
                      {index + 1}
                    </div>
                    <img
                      src={inf.avatarUrl}
                      alt={inf.username}
                      className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {inf.username}
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
                  {inf.followers >= 1000000
                    ? (inf.followers / 1000000).toFixed(1) + 'M'
                    : inf.followers >= 1000
                      ? (inf.followers / 1000).toFixed(1) + 'K'
                      : inf.followers}
                </td>
                <td className="p-4 font-semibold text-slate-600 text-sm">
                  {inf.engagementRate}%
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                    {inf.dominantTopic}
                  </span>
                </td>
                <td className="p-4 pr-8 text-center flex justify-center">
                  {getTrendIcon(inf.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfluencerRankingTable;
