import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { MessageCircle } from 'lucide-react';

const mockClusterData = {
  'Cluster A': {
    tweets: ['1460323737035677698', '933354946111705097'],
    topic: 'Kebijakan Publik & Anggaran',
    keywords: ['Pajak', 'Subsidi', 'APBN', 'Infrastruktur'],
  },
  'Cluster B': {
    tweets: ['1853634123518382405', '1853634123518382405'],
    topic: 'Aksi Protes & Mahasiswa',
    keywords: ['Demo', 'Turun', 'Adili', 'Revolusi'],
  },
  'Cluster C': {
    tweets: ['933354946111705097', '1853634123518382405'],
    topic: 'Ekonomi Kerakyatan',
    keywords: ['UMKM', 'Harga Sembako', 'Daya Beli'],
  },
  'Cluster D': {
    tweets: ['1460323737035677698', '1853634123518382405'],
    topic: 'Humor & Sarkasme Politik',
    keywords: ['Meme', 'Gimmick', 'Lucu', 'Sarkas'],
  },
};

const SNAConversation: React.FC = () => {
  const [activeCluster, setActiveCluster] =
    useState<keyof typeof mockClusterData>('Cluster A');

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
            Cluster Conversation Snapshot
          </h3>
          <p className="text-sm font-medium text-slate-500">
            View representative raw dialogue flowing within each isolated
            community partition.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto shrink-0 border border-slate-200/50">
          {(
            Object.keys(mockClusterData) as Array<keyof typeof mockClusterData>
          ).map((cluster) => (
            <button
              key={cluster}
              onClick={() => setActiveCluster(cluster)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap outline-none ${
                activeCluster === cluster
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* Active Cluster Context Header */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-300">
        <div>
          <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">
            Algorithmic Topic
          </h4>
          <span className="text-lg font-black text-slate-800 tracking-tight">
            {mockClusterData[activeCluster].topic}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {mockClusterData[activeCluster].keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 rounded-full"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Tweet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px] w-full items-start">
        {mockClusterData[activeCluster].tweets.map((tweetId, index) => (
          <div
            key={`${activeCluster}-${index}-${tweetId}`}
            className="animate-in fade-in zoom-in-95 duration-500 h-full"
          >
            <TwitterTweetEmbed
              tweetId={tweetId}
              options={{
                conversation: 'none',
                cards: 'hidden',
                align: 'center',
                width: '100%',
              }}
            />
          </div>
        ))}
      </div>

      {mockClusterData[activeCluster].tweets.length === 0 && (
        <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
          <MessageCircle size={32} className="mb-2 opacity-50" />
          <span className="text-sm font-medium">
            No representative tweets available
          </span>
        </div>
      )}
    </div>
  );
};

export default SNAConversation;
