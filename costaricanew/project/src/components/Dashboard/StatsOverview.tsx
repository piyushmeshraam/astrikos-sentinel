import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Shield,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { districts } from '../../data/districts';

interface StatsOverviewProps {
  selectedDistrict: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ selectedDistrict }) => {
  const { t } = useTranslation();
  const district = districts.find(d => d.id === selectedDistrict);
  
  if (!district) return null;

  const stats = [
    {
      title: t('stats.drugIncidents'),
      value: district.stats.drugIncidents,
      unit: t('stats.month'),
      icon: AlertTriangle,
      trend: 'down',
      change: '-12%',
      color: 'red'
    },
    {
      title: t('stats.responseTime'),
      value: district.stats.responseTime,
      unit: ` ${t('stats.min')}`,
      icon: Clock,
      trend: 'down',
      change: '-8%',
      color: 'green'
    },
    {
      title: t('stats.gangActivity'),
      value: district.stats.gangActivity,
      unit: ` ${t('stats.incidents')}`,
      icon: Shield,
      trend: 'stable',
      change: '0%',
      color: 'yellow'
    },
    {
      title: t('stats.communityTips'),
      value: district.stats.communityTips,
      unit: ` ${t('stats.reports')}`,
      icon: Users,
      trend: 'up',
      change: '+15%',
      color: 'blue'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string, color: string) => {
    if (trend === 'stable') return 'text-gray-500';
    if (color === 'red' || color === 'yellow') {
      return trend === 'down' ? 'text-green-500' : 'text-red-500';
    }
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {district.name} - {t('dashboard.keyMetrics')}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {t('dashboard.lastDays')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = getTrendIcon(stat.trend);
          
          return (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`w-4 h-4 ${getTrendColor(stat.trend, stat.color)}`} />
                  <span className={`text-sm font-medium ${getTrendColor(stat.trend, stat.color)}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsOverview;