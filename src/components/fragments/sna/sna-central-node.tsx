import React from 'react';
import { Network, Crown, Activity } from 'lucide-react';

interface CentralNodeData {
  id: string;
  username: string;
  avatarUrl: string;
  degree: number;
  betweenness: number;
  eigenvector: number;
  role: string;
  community: string;
}

const mockCentralNodes: CentralNodeData[] = [
  {
    id: '1',
    username: '@dimsum_politik',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    degree: 4820,
    betweenness: 0.89,
    eigenvector: 0.95,
    role: 'Network Hub',
    community: 'Cluster A',
  },
  {
    id: '2',
    username: '@tengah_jalan',
    avatarUrl: 'https://i.pravatar.cc/150?u=7',
    degree: 1205,
    betweenness: 0.94,
    eigenvector: 0.45,
    role: 'Community Bridge',
    community: 'Cluster C',
  },
  {
    id: '3',
    username: '@kawal_suara',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    degree: 3500,
    betweenness: 0.41,
    eigenvector: 0.88,
    role: 'Information Amplifier',
    community: 'Cluster A',
  },
  {
    id: '4',
    username: '@kampus_bergerak',
    avatarUrl: 'https://i.pravatar.cc/150?u=6',
    degree: 2890,
    betweenness: 0.65,
    eigenvector: 0.72,
    role: 'Local Hub',
    community: 'Cluster B',
  },
  {
    id: '5',
    username: '@suara_rakyat',
    avatarUrl: 'https://i.pravatar.cc/150?u=4',
    degree: 890,
    betweenness: 0.82,
    eigenvector: 0.31,
    role: 'Community Bridge',
    community: 'Cluster B',
  },
];

const SNACentralNode: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
            <Crown className="text-amber-500" size={20} />
            Central Nodes (Network Leaders)
          </h3>
          <p className="text-sm font-medium text-slate-500 max-w-2xl">
            Identify the most structurally important accounts beyond raw
            followers. Ranked by topology metrics.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="p-4 pl-8">Node (Account)</th>
              <th className="p-4 bg-blue-50/30">
                Degree
                <br />
                <span className="text-[9px] font-medium normal-case text-slate-400">
                  Total Connections
                </span>
              </th>
              <th className="p-4 bg-purple-50/30">
                Betweenness
                <br />
                <span className="text-[9px] font-medium normal-case text-slate-400">
                  Bridge Score (0-1)
                </span>
              </th>
              <th className="p-4 bg-amber-50/30">
                Eigenvector
                <br />
                <span className="text-[9px] font-medium normal-case text-slate-400">
                  Elite Score (0-1)
                </span>
              </th>
              <th className="p-4">Structural Role</th>
              <th className="p-4 pr-8">Community</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockCentralNodes.map((node, index) => (
              <tr
                key={node.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="p-4 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-slate-400 w-4">
                      {index + 1}
                    </div>
                    <img
                      src={node.avatarUrl}
                      alt={node.username}
                      className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors cursor-pointer">
                      {node.username}
                    </span>
                  </div>
                </td>
                <td className="p-4 bg-blue-50/10">
                  <span className="font-black text-slate-700">
                    {node.degree.toLocaleString()}
                  </span>
                </td>
                <td className="p-4 bg-purple-50/10">
                  <span className="font-black text-slate-700">
                    {node.betweenness.toFixed(2)}
                  </span>
                </td>
                <td className="p-4 bg-amber-50/10">
                  <span className="font-black text-slate-700">
                    {node.eigenvector.toFixed(2)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold flex items-center gap-1.5 w-max">
                    {node.role === 'Community Bridge' ? (
                      <Network size={12} className="text-purple-500" />
                    ) : (
                      <Activity size={12} className="text-blue-500" />
                    )}
                    {node.role}
                  </span>
                </td>
                <td className="p-4 pr-8">
                  <span className="font-semibold text-slate-500 text-sm">
                    {node.community}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SNACentralNode;
