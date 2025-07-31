import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, MapPin, Activity, Users, Shield, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import DistrictSelector from './DistrictSelector';
import StatsOverview from './StatsOverview';
import LiveCCTVFeed from './LiveCCTVFeed';
import InteractiveMapWidget from './InteractiveMapWidget';
import TrendCharts from './TrendCharts';
import { districts } from '../../data/districts';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('alajuelita');
  const [activeFilters, setActiveFilters] = useState({
    timeRange: '24h',
    crimeType: 'all',
    severity: 'all'
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();

  const district = districts.find(d => d.id === selectedDistrict);

  const kpiCards = [
    {
      title: 'Active Incidents',
      value: district?.stats.drugIncidents || 0,
      change: '-12%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Response Time',
      value: `${district?.stats.responseTime || 0}m`,
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Community Tips',
      value: district?.stats.communityTips || 0,
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Gang Activity',
      value: district?.stats.gangActivity || 0,
      change: '0%',
      trend: 'stable',
      icon: Shield,
      color: 'yellow'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Top Banner */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('dashboard.title')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {district?.name} District • Live Data
              </p>
            </div>
          </div>
          
          {/* Quick Stats Banner */}
          <div className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto">
            {kpiCards.slice(0, 2).map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 text-${kpi.color}-600`} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)]">
        {/* Left Sidebar - Filters */}
        <motion.div
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0"
        >
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                District Selection
              </h3>
              <DistrictSelector 
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                compact={true}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Time Range
              </h3>
              <select
                value={activeFilters.timeRange}
                onChange={(e) => setActiveFilters({...activeFilters, timeRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Crime Type
              </h3>
              <select
                value={activeFilters.crimeType}
                onChange={(e) => setActiveFilters({...activeFilters, crimeType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="drug">Drug Related</option>
                <option value="gang">Gang Activity</option>
                <option value="theft">Theft</option>
                <option value="violence">Violence</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Severity Level
              </h3>
              <div className="space-y-2">
                {['all', 'low', 'medium', 'high', 'critical'].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={activeFilters.severity === level}
                      onChange={(e) => setActiveFilters({...activeFilters, severity: e.target.value})}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {level === 'all' ? 'All Levels' : level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto w-full">
          <div className="p-4 lg:p-6 space-y-6 w-full">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-8 h-8 text-${kpi.color}-600`} />
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {kpi.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {kpi.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Interactive Map */}
              <div className="xl:col-span-2">
                <InteractiveMapWidget 
                  selectedDistrict={selectedDistrict}
                  filters={activeFilters}
                />
              </div>

              {/* Live CCTV Feed */}
              <div>
                <LiveCCTVFeed district={district?.name || 'Alajuelita'} />
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TrendCharts 
                selectedDistrict={selectedDistrict}
                filters={activeFilters}
              />
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '2 min ago', event: 'Drug incident reported', location: 'Sector 3', severity: 'high' },
                    { time: '8 min ago', event: 'Patrol deployed', location: 'Route 27', severity: 'medium' },
                    { time: '15 min ago', event: 'Community tip received', location: 'San Felipe', severity: 'low' },
                    { time: '23 min ago', event: 'CCTV motion detected', location: 'Main St', severity: 'medium' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.severity === 'high' ? 'bg-red-500' :
                        activity.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.event}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {activity.location} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;