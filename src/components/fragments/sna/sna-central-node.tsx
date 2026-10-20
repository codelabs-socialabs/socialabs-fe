import React, { useMemo } from 'react';
import { Crown, Activity } from 'lucide-react';
import type { SNACommunityResult } from '@/types/project';

interface SNACentralNodeProps {
  data?: SNACommunityResult | null;
}

const SNACentralNode: React.FC<SNACentralNodeProps> = ({ data }) => {
  const centralNodes = useMemo(() => {
    if (!data || !data.nodes || data.nodes.length === 0) return [];

    const degrees: Record<string, number> = {};
    for (const edge of data.edges ?? []) {
      degrees[edge.source] = (degrees[edge.source] ?? 0) + 1;
      degrees[edge.target] = (degrees[edge.target] ?? 0) + 1;
    }

    return [...data.nodes]
      .map((node) => ({
        ...node,
        degree: degrees[node.id] ?? 0,
      }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 10);
  }, [data]);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
            <Crown className="text-amber-500" size={20} />
            Central Nodes (Network Leaders)
          </h3>
          <p className="text-sm font-medium text-slate-500 max-w-2xl">
            Identify the most structurally important accounts based on degree
            and interaction topology.
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
              <th className="p-4">Structural Role</th>
              <th className="p-4 pr-8">Community</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {centralNodes.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-sm text-slate-500"
                >
                  No central nodes detected.
                </td>
              </tr>
            ) : (
              centralNodes.map((node, index) => (
                <tr
                  key={node.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-4 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-slate-400 w-4">
                        {index + 1}
                      </div>
                      <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        @{node.name || node.id}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 bg-blue-50/10">
                    <span className="font-black text-slate-700">
                      {node.degree.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold flex items-center gap-1.5 w-max">
                      <Activity size={12} className="text-blue-500" />
                      {node.degree > 5 ? 'Hub Account' : 'Participant'}
                    </span>
                  </td>
                  <td className="p-4 pr-8">
                    <span className="text-xs font-bold text-slate-600">
                      {node.community !== undefined && node.community !== null
                        ? `Community ${node.community}`
                        : 'General Cluster'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SNACentralNode;
