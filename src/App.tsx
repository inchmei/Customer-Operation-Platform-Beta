import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      default:
        return (
          <div className="p-12 flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 border border-zinc-800">
              <span className="text-4xl">🚧</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{activeTab.toUpperCase()} 模块开发中</h2>
            <p className="text-zinc-500 max-w-md">
              该功能模块正在与欧洲 MDR 核心系统进行 API 对接，预计将在下个版本发布。
            </p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="mt-8 px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-bold text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              返回经营看板
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
