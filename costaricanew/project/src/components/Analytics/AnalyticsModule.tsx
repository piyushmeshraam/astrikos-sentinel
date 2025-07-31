import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Filter, TrendingUp, AlertTriangle, Users, Shield } from 'lucide-react';
import { mockKPIs } from '../../data/mockKPIs';
import KPITable from './KPITable';
import KPICharts from './KPICharts';
import ExportModal from './ExportModal';

interface AnalyticsModuleProps {
  selectedDistrict: string;
}

const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ selectedDistrict }) => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'table' | 'charts'>('table');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredKPIs = mockKPIs.filter(kpi => {
    const matchesDistrict = selectedDistrict === 'all' || kpi.districtId === selectedDistrict;
    const matchesCategory = selectedCategory === 'all' || kpi.category === selectedCategory;
    return matchesDistrict && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Categories', icon: Filter },
    { id: 'safety', label: t('kpi.safety'), icon: Shield },
    { id: 'response', label: t('kpi.response'), icon: TrendingUp },
    { id: 'community', label: t('kpi.community'), icon: Users },
    { id: 'prevention', label: t('kpi.prevention'), icon: AlertTriangle },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.analytics')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive KPI analysis and performance metrics
          </p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>{t('actions.exportData')}</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-2 w-full">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs lg:text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-2 w-full">
          <button
            onClick={() => setActiveView('table')}
            className={`flex-1 lg:flex-none px-4 py-2 rounded-lg transition-colors ${
              activeView === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setActiveView('charts')}
            className={`flex-1 lg:flex-none px-4 py-2 rounded-lg transition-colors ${
              activeView === 'charts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Charts View
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'table' ? (
        <KPITable kpis={filteredKPIs} />
      ) : (
        <KPICharts kpis={filteredKPIs} />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          kpis={filteredKPIs}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default AnalyticsModule;