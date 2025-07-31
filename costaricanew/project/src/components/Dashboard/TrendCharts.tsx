import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendChartsProps {
  selectedDistrict: string;
  filters: {
    timeRange: string;
    crimeType: string;
    severity: string;
  };
}

const TrendCharts: React.FC<TrendChartsProps> = ({ selectedDistrict, filters }) => {
  // Mock trend data
  const trendData = [
    { time: '00:00', incidents: 2, patrols: 3, tips: 1 },
    { time: '04:00', incidents: 1, patrols: 2, tips: 0 },
    { time: '08:00', incidents: 5, patrols: 4, tips: 3 },
    { time: '12:00', incidents: 8, patrols: 5, tips: 4 },
    { time: '16:00', incidents: 12, patrols: 6, tips: 7 },
    { time: '20:00', incidents: 15, patrols: 8, tips: 5 },
    { time: '23:59', incidents: 6, patrols: 4, tips: 2 }
  ];

  const crimeTypeData = [
    { name: 'Drug Related', value: 45, color: '#EF4444' },
    { name: 'Gang Activity', value: 25, color: '#F59E0B' },
    { name: 'Theft', value: 20, color: '#3B82F6' },
    { name: 'Violence', value: 10, color: '#10B981' }
  ];

  const responseTimeData = [
    { district: 'Alajuelita', time: 8 },
    { district: 'San Josecito', time: 6 },
    { district: 'San Antonio', time: 12 },
    { district: 'Concepción', time: 9 },
    { district: 'San Felipe', time: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Incident Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              24-Hour Incident Trends
            </h3>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filters.timeRange}
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                stroke="currentColor"
              />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, rgb(31 41 55))',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--tooltip-text, white)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                name="Incidents"
              />
              <Line 
                type="monotone" 
                dataKey="patrols" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                name="Patrols"
              />
              <Line 
                type="monotone" 
                dataKey="tips" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                name="Tips"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Crime Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Crime Type Distribution
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, rgb(31 41 55))',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text, white)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {crimeTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Response Time Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Response Time by District
          </h3>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-30" />
              <XAxis 
                dataKey="district" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                stroke="currentColor"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, rgb(31 41 55))',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--tooltip-text, white)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} min`, 'Response Time']}
              />
              <Bar 
                dataKey="time" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default TrendCharts;