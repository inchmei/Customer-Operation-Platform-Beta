import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  ExternalLink, 
  FileText, 
  Download, 
  Send, 
  ShieldCheck, 
  Clock,
  ChevronRight,
  X,
  Monitor,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Customer {
  id: string;
  name: string;
  status: 'Active' | 'Trial' | 'Expired';
  authStatus: { used: number; total: number };
  onlineRate: number;
  expiryDate: string;
  assets: { online: number; offline: number };
}

const mockCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'Lufthansa Systems AG', 
    status: 'Active', 
    authStatus: { used: 255, total: 300 }, 
    onlineRate: 94,
    expiryDate: '2026-12-15',
    assets: { online: 240, offline: 15 }
  },
  { 
    id: '2', 
    name: 'Siemens Energy Europe', 
    status: 'Active', 
    authStatus: { used: 1240, total: 1500 }, 
    onlineRate: 98,
    expiryDate: '2027-03-20',
    assets: { online: 1215, offline: 25 }
  },
  { 
    id: '3', 
    name: 'Deutsche Bank (Retail)', 
    status: 'Trial', 
    authStatus: { used: 45, total: 50 }, 
    onlineRate: 88,
    expiryDate: '2026-04-01',
    assets: { online: 40, offline: 5 }
  },
  { 
    id: '4', 
    name: 'Renault Group FR', 
    status: 'Active', 
    authStatus: { used: 890, total: 1000 }, 
    onlineRate: 92,
    expiryDate: '2026-09-12',
    assets: { online: 820, offline: 70 }
  },
  { 
    id: '5', 
    name: 'Metro AG', 
    status: 'Expired', 
    authStatus: { used: 0, total: 200 }, 
    onlineRate: 0,
    expiryDate: '2026-02-28',
    assets: { online: 0, offline: 200 }
  },
];

const StatusTag = ({ status }: { status: Customer['status'] }) => {
  const styles = {
    Active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Trial: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Expired: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status === 'Active' ? '服务中' : status === 'Trial' ? '测试中' : '已到期'}
    </span>
  );
};

export default function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">客户管理</h1>
          <p className="text-zinc-500 mt-1">管理您的最终用户授权、合规状态及安全报告。</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          <Plus className="w-4 h-4" />
          创建新最终用户
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="搜索客户名称或 ID..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-zinc-300"
          />
        </div>
        <select className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-blue-500">
          <option>所有状态</option>
          <option>服务中</option>
          <option>测试中</option>
          <option>已到期</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-zinc-800">
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">客户名称</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">服务状态</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">授权状态</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">设备在线率</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {mockCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-zinc-800/30 transition-colors cursor-pointer group"
                onClick={() => setSelectedCustomer(customer)}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {customer.name.charAt(0)}
                    </div>
                    <span className="font-bold text-zinc-100">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusTag status={customer.status} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-mono text-zinc-300">{customer.authStatus.used} / {customer.authStatus.total}</span>
                    <div className="w-24 h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(customer.authStatus.used / customer.authStatus.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[120px] h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          customer.onlineRate > 90 ? 'bg-emerald-500' : customer.onlineRate > 70 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${customer.onlineRate}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">{customer.onlineRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[500px] bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusTag status={selectedCustomer.status} />
                      <span className="text-[10px] text-zinc-500 font-mono">ID: {selectedCustomer.id.padStart(6, '0')}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Quick Jump */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg shadow-blue-900/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-2 py-1 bg-white/10 rounded-md border border-white/20">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">受审计的合规访问</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">跳转至 MDR 交付平台</h3>
                    <p className="text-blue-100 text-xs mb-4">实时查看安全事件响应、威胁狩猎及资产详情。</p>
                    <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                      立即进入平台
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Compliance Dashboard Area */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">合规看板区</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">资产状态 (在线/离线)</p>
                      <div className="h-32 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Online', value: selectedCustomer.assets.online, color: '#10b981' },
                                { name: 'Offline', value: selectedCustomer.assets.offline, color: '#3f3f46' }
                              ]}
                              innerRadius={35}
                              outerRadius={50}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#10b981" stroke="none" />
                              <Cell fill="#27272a" stroke="none" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-lg font-bold text-white">{selectedCustomer.assets.online}</span>
                          <span className="text-[8px] text-zinc-500 uppercase font-bold">在线</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">授权到期日</p>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-lg font-mono font-bold text-white">{selectedCustomer.expiryDate}</p>
                          <p className="text-[10px] text-emerald-500 font-bold">剩余 284 天</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Report Management Area */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">报告管理区</h3>
                  </div>
                  <div className="space-y-3">
                    {['2026年02月', '2026年01月', '2025年12月'].map((month, idx) => (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group hover:border-zinc-700 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-rose-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-200">{month} 安全月报</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">PDF • 2.4 MB</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="下载">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="转发给客户">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/30">
                <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold text-sm transition-colors border border-zinc-700">
                  查看完整审计日志
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
