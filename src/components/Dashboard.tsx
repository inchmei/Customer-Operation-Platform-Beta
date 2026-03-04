import React from 'react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import EuropeMap from './EuropeMap';

const arrData = [
  { value: 400 }, { value: 600 }, { value: 550 }, 
  { value: 800 }, { value: 750 }, { value: 900 }, { value: 1100 }
];

const statusData = [
  { name: '服务中', value: 65, color: '#10b981' },
  { name: '测试中', value: 25, color: '#3b82f6' },
  { name: '已到期', value: 10, color: '#f43f5e' },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  chart?: boolean;
  alert?: boolean;
}

function StatCard({ title, value, change, isPositive, icon: Icon, chart, alert }: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-zinc-800 rounded-xl group-hover:bg-blue-600/10 transition-colors">
          <Icon className={`w-5 h-5 ${alert ? 'text-rose-500' : 'text-zinc-400 group-hover:text-blue-400'}`} />
        </div>
        {alert && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">紧急提醒</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-zinc-500 font-medium">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
          <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        </div>
      </div>

      {chart && (
        <div className="h-12 mt-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={arrData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">经营看板</h1>
          <p className="text-zinc-500 mt-1">欢迎回来，Marcus。这是您今天的业务概览。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
            下载报告
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            新增授权
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="累计 ARR (EUR)" 
          value="€4,285,000" 
          change="+12.5%" 
          isPositive={true} 
          icon={TrendingUp}
          chart
        />
        <StatCard 
          title="当前在线客户数" 
          value="587" 
          change="+24" 
          isPositive={true} 
          icon={Users}
        />
        <StatCard 
          title="本月新增积分消耗" 
          value="342,000" 
          change="-4.2%" 
          isPositive={false} 
          icon={Activity}
        />
        <StatCard 
          title="即将到期客户" 
          value="12" 
          change="需关注" 
          isPositive={false} 
          icon={AlertCircle}
          alert
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">客户状态分布</h3>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">按服务生命周期划分</p>
          </div>
          
          <div className="flex-1 min-h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#09090b', 
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">587</span>
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">总客户数</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{item.name}</span>
                </div>
                <p className="text-lg font-bold text-white font-mono">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Card */}
        <div className="lg:col-span-2">
          <EuropeMap />
        </div>
      </div>
    </div>
  );
}
