import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Coins, 
  Settings, 
  Shield 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: '经营看板', icon: LayoutDashboard },
  { id: 'customers', label: '客户管理', icon: Users },
  { id: 'auth', label: '授权中心', icon: ShieldCheck },
  { id: 'credits', label: '积分管理', icon: Coins },
  { id: 'settings', label: '子账号设置', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Shield className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">CyberShield</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">系统状态</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-300">所有服务正常</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
