import React from 'react';
import { Mic2, Repeat2, MessageCircle, Network } from 'lucide-react';
import type { InfluencerBuzzer } from '@/types/project';

interface RoleClassificationProps {
  influencers?: InfluencerBuzzer[];
}

const RoleClassification: React.FC<RoleClassificationProps> = ({
  influencers = [],
}) => {
  const counts = {
    Originator: influencers.filter((i) => i.role === 'Originator').length,
    Amplifier: influencers.filter((i) => i.role === 'Amplifier').length,
    Engager: influencers.filter((i) => i.role === 'Engager').length,
    Bridge: influencers.filter((i) => i.role === 'Bridge').length,
  };

  const roles = [
    {
      id: 'originator',
      icon: Mic2,
      name: 'Originator',
      description: 'Starts the original narratives and creates novel hashtags.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      count: counts.Originator,
    },
    {
      id: 'amplifier',
      icon: Repeat2,
      name: 'Amplifier',
      description:
        'Retweet-heavy accounts that massively spread existing narratives.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      count: counts.Amplifier,
    },
    {
      id: 'engager',
      icon: MessageCircle,
      name: 'Engager',
      description: 'Reply-heavy accounts driving deep interactive discussions.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      count: counts.Engager,
    },
    {
      id: 'bridge',
      icon: Network,
      name: 'Bridge',
      description: 'Accounts connecting previously isolated echo chambers.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      count: counts.Bridge,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Role Classification
        </h3>
        <p className="text-sm font-medium text-slate-500">
          Breakdown of structural impact types, separated by their primary
          behavioral patterns in the network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`p-5 rounded-2xl border ${role.border} ${role.bg} flex flex-col`}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${role.color}`}
              >
                <role.icon size={20} strokeWidth={2.5} />
              </div>
              <span className={`text-2xl font-black ${role.color}`}>
                {role.count}
              </span>
            </div>
            <h4 className={`text-lg font-bold ${role.color} mb-1`}>
              {role.name}
            </h4>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleClassification;
