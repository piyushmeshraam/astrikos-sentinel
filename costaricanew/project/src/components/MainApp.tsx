import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './Auth/LoginForm';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import AnalyticsModule from './Analytics/AnalyticsModule';
import MapsModule from './Maps/MapsModule';
import AIAdvisoryModule from './AI/AIAdvisoryModule';
import SettingsModule from './Settings/SettingsModule';
import CCTVModule from './CCTV/CCTVModule';
const MainApp: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsModule selectedDistrict="alajuelita" />;
      case 'maps':
        return <MapsModule selectedDistrict="alajuelita" />;
      case 'surveillance':
        return <CCTVModule />;
      case 'predictions':
        return <AIAdvisoryModule selectedDistrict="alajuelita" />;
      case 'community':
        return <div className="p-6 text-gray-600 dark:text-gray-400">Community engagement module coming soon...</div>;
      case 'trends':
        return <div className="p-6 text-gray-600 dark:text-gray-400">Trends analysis module coming soon...</div>;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Header />
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainApp;