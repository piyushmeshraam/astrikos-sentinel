import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { districts } from '../../data/districts';
import { District } from '../../types';

interface DistrictSelectorProps {
  selectedDistrict: string;
  onDistrictChange: (districtId: string) => void;
  compact?: boolean;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  selectedDistrict,
  onDistrictChange,
  compact = false,
}) => {
  const { t } = useTranslation();

  const getCrimeLevelColor = (level: District['crimeLevel']) => {
    switch (level) {
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'moderate': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'high': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'critical': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {districts.map((district) => (
          <button
            key={district.id}
            onClick={() => onDistrictChange(district.id)}
            className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
              selectedDistrict === district.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {district.name}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeLevelColor(district.crimeLevel)}`}>
                {t(`crime.${district.crimeLevel}`)}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Pop: {district.population.toLocaleString()} • {district.stats.drugIncidents} incidents
            </div>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('dashboard.selectDistrict')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {districts.map((district) => (
          <button
            key={district.id}
            onClick={() => onDistrictChange(district.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedDistrict === district.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {district.name}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeLevelColor(district.crimeLevel)}`}>
                {t(`crime.${district.crimeLevel}`)}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('stats.population')}:</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {district.population.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('stats.drugIncidents')}:</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {district.stats.drugIncidents}{t('stats.month')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('stats.responseTime')}:</span>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {district.stats.responseTime} {t('stats.min')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('stats.communityTips')}:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {district.stats.communityTips}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;