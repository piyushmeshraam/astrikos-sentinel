import React, { useState, useEffect } from 'react';
import { Zap, Target, Users, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { RealTimeData } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';

interface ActionableInsightsProps {
  selectedDistrict: string;
  realTimeData: RealTimeData;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'patrol' | 'community' | 'resources' | 'prevention';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  actions: string[];
  metrics: {
    current: number;
    target: number;
    unit: string;
  };
}

const ActionableInsights: React.FC<ActionableInsightsProps> = ({ selectedDistrict, realTimeData }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const mockInsights: Insight[] = [
      {
        id: '1',
        title: 'Optimize Evening Patrol Routes',
        description: 'Analysis shows 73% of drug incidents occur between 8-11 PM in sectors 3 and 7. Current patrol coverage is suboptimal during these hours.',
        priority: 'high',
        category: 'patrol',
        impact: 'Could reduce evening incidents by 35%',
        effort: 'medium',
        actions: [
          'Redeploy 2 patrol units to sectors 3 and 7 during 8-11 PM',
          'Implement dynamic routing based on real-time risk scores',
          'Coordinate with community watch groups'
        ],
        metrics: {
          current: 45,
          target: 29,
          unit: 'incidents/month'
        }
      },
      {
        id: '2',
        title: 'Enhance Community Engagement',
        description: 'Low community tip rate (23 reports/month) compared to similar districts. Social media sentiment analysis shows trust issues.',
        priority: 'medium',
        category: 'community',
        impact: 'Increase intelligence gathering by 60%',
        effort: 'high',
        actions: [
          'Launch anonymous tip mobile app',
          'Organize monthly community meetings',
          'Implement community policing program',
          'Create multilingual outreach materials'
        ],
        metrics: {
          current: 23,
          target: 50,
          unit: 'tips/month'
        }
      },
      {
        id: '3',
        title: 'Deploy Predictive CCTV Monitoring',
        description: 'AI analysis identifies 4 high-risk intersections with inadequate surveillance coverage during peak crime hours.',
        priority: 'critical',
        category: 'resources',
        impact: 'Prevent 40% of street-level drug transactions',
        effort: 'low',
        actions: [
          'Install 4 additional CCTV cameras at identified locations',
          'Implement AI-powered motion detection alerts',
          'Train operators on new monitoring protocols'
        ],
        metrics: {
          current: 8,
          target: 12,
          unit: 'cameras'
        }
      },
      {
        id: '4',
        title: 'Target Gang Recruitment Prevention',
        description: 'Social network analysis reveals increased recruitment activity near schools. Early intervention could prevent 15 new gang members.',
        priority: 'high',
        category: 'prevention',
        impact: 'Reduce future gang activity by 25%',
        effort: 'medium',
        actions: [
          'Deploy youth outreach officers to identified schools',
          'Partner with education ministry for prevention programs',
          'Monitor social media for recruitment patterns',
          'Establish safe reporting mechanisms for students'
        ],
        metrics: {
          current: 12,
          target: 5,
          unit: 'gang activity index'
        }
      }
    ];

    setInsights(mockInsights);
  }, [selectedDistrict]);

  const categories = [
    { id: 'all', label: 'All Insights', icon: Zap },
    { id: 'patrol', label: 'Patrol Optimization', icon: Shield },
    { id: 'community', label: 'Community Engagement', icon: Users },
    { id: 'resources', label: 'Resource Allocation', icon: Target },
    { id: 'prevention', label: 'Crime Prevention', icon: TrendingUp }
  ];

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-2">
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
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {insight.title}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                {insight.priority}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {insight.description}
            </p>

            {/* Impact and Effort */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Expected Impact
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {insight.impact}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Implementation Effort
                </h4>
                <p className={`text-sm font-medium ${getEffortColor(insight.effort)}`}>
                  {insight.effort.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {insight.metrics.current} {insight.metrics.unit}
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Target</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {insight.metrics.target} {insight.metrics.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Recommended Actions
              </h4>
              <ul className="space-y-1">
                {insight.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Implement Insight
            </button>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Insights Summary
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['critical', 'high', 'medium', 'low'].map((priority) => {
            const count = insights.filter(i => i.priority === priority).length;
            return (
              <div key={priority} className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${getPriorityColor(priority)}`}>
                  <span className="text-lg font-bold">{count}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {priority} Priority
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActionableInsights;