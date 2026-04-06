import React from 'react';
import { MessageSquare, MoreHorizontal, Plus } from 'lucide-react';

interface ChatRoom {
  id: string;
  title: string;
  date: string;
  isActive?: boolean;
}

const MOCK_HISTORY: { group: string; rooms: ChatRoom[] }[] = [
  {
    group: 'Today',
    rooms: [
      {
        id: '1',
        title: 'Analisis Sentimen Kenaikan Harga',
        date: 'Today',
        isActive: true,
      },
      { id: '2', title: 'Identifikasi Influencer Kampanye', date: 'Today' },
    ],
  },
  {
    group: 'Previous 7 Days',
    rooms: [
      { id: '3', title: 'Network Graph Overview', date: 'Yesterday' },
      { id: '4', title: 'Ekstraksi Topik Debat Pilpres', date: '3 Days ago' },
      { id: '5', title: 'Ringkasan Eksekutif Q1', date: '5 Days ago' },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
}

const SidebarChatbot: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`w-56 border-r border-slate-200 bg-slate-50/50 flex flex-col h-full shrink-0 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="p-4 mt-2">
        <span className="text-[12px] font-bold text-slate-800 ml-1 uppercase tracking-widest opacity-80">
          Chat History
        </span>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-4">
        {/* Floating New Chat Action */}
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 mb-6 text-slate-600 hover:text-slate-900 font-medium transition-colors group">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 group-hover:bg-slate-300 transition-colors">
            <Plus size={14} className="text-slate-700" />
          </div>
          <span className="text-[14px]">New Chat</span>
        </button>
        {MOCK_HISTORY.map((group, gIdx) => (
          <div key={gIdx} className="mb-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </h4>
            <div className="flex flex-col gap-0.5">
              {group.rooms.map((room) => (
                <button
                  key={room.id}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors group ${
                    room.isActive
                      ? 'text-slate-900 font-semibold bg-slate-100/50'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <MessageSquare
                      size={13}
                      className={
                        room.isActive
                          ? 'text-blue-500'
                          : 'text-slate-300 group-hover:text-slate-400'
                      }
                    />
                    <span className="text-[13px] truncate">{room.title}</span>
                  </div>
                  {room.isActive && (
                    <MoreHorizontal
                      size={14}
                      className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarChatbot;
