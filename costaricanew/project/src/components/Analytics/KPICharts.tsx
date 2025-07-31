import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { KPI } from '../../types';
import { motion } from 'framer-motion';

interface KPIChartsProps {
  kpis: KPI[];
}

const KPICharts: React.FC<KPIChartsProps> = ({ kpis }) => {
  const chartData = kpis.map(kpi => ({
    name: kpi.name.split(' ').slice(0, 2).join(' '),
    current: kpi.currentValue,
    target: kpi.targetValue,
    category: kpi.category
  }));

  const categoryData = kpis.reduce((acc, kpi) => {
    acc[kpi.category] = (acc[kpi.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Current vs Target Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Current vs Target Values
        </h3>
        <div className="h-64 lg:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'currentColor', fontSize: 12 }}
                stroke="currentColor"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
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
              <Bar dataKey="current" fill="#3B82F6" name="Current" />
              <Bar dataKey="target" fill="#10B981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Trends
          </h3>
          <div className="h-48 lg:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
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
                  dataKey="current" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            KPI Distribution by Category
          </h3>
          <div className="h-48 lg:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </motion.div>
      </div>
    </div>
  );
};

export default KPICharts;