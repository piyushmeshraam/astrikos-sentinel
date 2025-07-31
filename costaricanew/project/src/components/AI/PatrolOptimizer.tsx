import React, { useState, useEffect } from 'react';
import { Route, Navigation, Clock, Users, MapPin, Zap } from 'lucide-react';
import { RealTimeData } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface PatrolOptimizerProps {
  selectedDistrict: string;
  realTimeData: RealTimeData;
}

interface PatrolRoute {
  id: string;
  name: string;
  sectors: string[];
  duration: number;
  priority: 'low' | 'medium' | 'high';
  riskScore: number;
  currentStatus: 'active' | 'idle' | 'maintenance';
  lastPatrolled: string;
  efficiency: number;
  recommendations: string[];
}

const PatrolOptimizer: React.FC<PatrolOptimizerProps> = ({ selectedDistrict, realTimeData }) => {
  const [routes, setRoutes] = useState<PatrolRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    const mockRoutes: PatrolRoute[] = [
      {
        id: '1',
        name: 'Central Patrol Route',
        sectors: ['Sector 1', 'Sector 2', 'Sector 3'],
        duration: 45,
        priority: 'high',
        riskScore: 8.2,
        currentStatus: 'active',
        lastPatrolled: '15 minutes ago',
        efficiency: 87,
        recommendations: [
          'Increase frequency during 8-11 PM',
          'Add checkpoint at Main Street intersection',
          'Coordinate with CCTV monitoring'
        ]
      },
      {
        id: '2',
        name: 'School Zone Circuit',
        sectors: ['Sector 4', 'Sector 5'],
        duration: 30,
        priority: 'medium',
        riskScore: 6.1,
        currentStatus: 'idle',
        lastPatrolled: '2 hours ago',
        efficiency: 73,
        recommendations: [
          'Focus on school hours (7-8 AM, 2-3 PM)',
          'Implement foot patrol during breaks',
          'Engage with school security'
        ]
      },
      {
        id: '3',
        name: 'Commercial District Loop',
        sectors: ['Sector 6', 'Sector 7', 'Sector 8'],
        duration: 60,
        priority: 'high',
        riskScore: 9.1,
        currentStatus: 'active',
        lastPatrolled: '8 minutes ago',
        efficiency: 92,
        recommendations: [
          'Extend coverage to side streets',
          'Increase presence during business hours',
          'Monitor loading zones for suspicious activity'
        ]
      },
      {
        id: '4',
        name: 'Residential Perimeter',
        sectors: ['Sector 9', 'Sector 10'],
        duration: 35,
        priority: 'low',
        riskScore: 4.3,
        currentStatus: 'maintenance',
        lastPatrolled: '4 hours ago',
        efficiency: 65,
        recommendations: [
          'Resume regular patrols after maintenance',
          'Focus on evening hours (6-10 PM)',
          'Coordinate with neighborhood watch'
        ]
      }
    ];

    setRoutes(mockRoutes);
  }, [selectedDistrict]);

  const optimizeRoutes = async () => {
    setOptimizing(true);
    toast.loading('Optimizing patrol routes...', { id: 'optimize' });

    // Simulate AI optimization
    setTimeout(() => {
      const optimizedRoutes = routes.map(route => ({
        ...route,
        efficiency: Math.min(100, route.efficiency + Math.random() * 10),
        riskScore: Math.max(1, route.riskScore - Math.random() * 2)
      }));

      setRoutes(optimizedRoutes);
      toast.success('Patrol routes optimized successfully!', { id: 'optimize' });
      setOptimizing(false);
    }, 3000);
  };

  const deployPatrol = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    if (route) {
      toast.success(`Patrol deployed to ${route.name}`);
      
      // Update route status
      setRoutes(prev => prev.map(r => 
        r.id === routeId 
          ? { ...r, currentStatus: 'active', lastPatrolled: 'Just now' }
          : r
      ));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'idle': return 'text-yellow-600';
      case 'maintenance': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Optimization Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Route className="w-5 h-5 text-blue-600" />
            <span>Patrol Route Optimization</span>
          </h3>
          
          <button
            onClick={optimizeRoutes}
            disabled={optimizing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>{optimizing ? 'Optimizing...' : 'Optimize Routes'}</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {routes.filter(r => r.currentStatus === 'active').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Patrols</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(routes.reduce((acc, r) => acc + r.efficiency, 0) / routes.length)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Efficiency</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {routes.reduce((acc, r) => acc + r.sectors.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sectors Covered</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(routes.reduce((acc, r) => acc + r.riskScore, 0) / routes.length * 10) / 10}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Risk Score</p>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border cursor-pointer transition-all ${
              selectedRoute === route.id
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setSelectedRoute(route.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {route.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {route.sectors.join(' → ')}
                  </p>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(route.priority)}`}>
                    {route.priority}
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(route.currentStatus)}`}>
                    {route.currentStatus}
                  </span>
                </div>
              </div>

              {/* Route Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {route.duration}m
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {route.riskScore}/10
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Risk Score</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {route.efficiency}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Efficiency</p>
                </div>
              </div>

              {/* Efficiency Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Efficiency</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{route.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      route.efficiency >= 80 ? 'bg-green-500' : 
                      route.efficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${route.efficiency}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Last patrolled: {route.lastPatrolled}</span>
                <span>{route.recommendations.length} recommendations</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deployPatrol(route.id);
                  }}
                  disabled={route.currentStatus === 'maintenance'}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
                >
                  Deploy Patrol
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route Details */}
      {selectedRoute && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          {(() => {
            const route = routes.find(r => r.id === selectedRoute);
            if (!route) return null;

            return (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {route.name} - Optimization Recommendations
                </h3>

                <div className="space-y-3">
                  {route.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                          Recommendation {index + 1}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {rec}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Apply All Recommendations
                  </button>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default PatrolOptimizer;