import React from 'react';
import { Bell, Search, User, Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="搜索客户、订单或文档..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-zinc-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">
          <Wallet className="w-4 h-4 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 leading-none uppercase font-bold tracking-wider">当前积分余额</span>
            <span className="text-sm font-mono font-bold text-emerald-400">1,248,500 pts</span>
          </div>
        </div>

        <div className="h-8 w-px bg-zinc-800" />

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">CyberShield EU</p>
            <p className="text-xs text-zinc-500 mt-1">PSM: Marcus Weber</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-zinc-800 shadow-xl">
            <User className="text-white w-5 h-5" />
          </div>
          <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-zinc-950" />
          </button>
        </div>
      </div>
    </header>
  );
}
