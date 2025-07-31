import { useState, useEffect } from 'react';

export interface RealTimeData {
  alerts: any[];
  incidents: any[];
  predictions: any[];
  lastUpdated: string;
}

export const useRealTimeSync = (districtId: string) => {
  const [data, setData] = useState<RealTimeData>({
    alerts: [],
    incidents: [],
    predictions: [],
    lastUpdated: new Date().toISOString()
  });
  const [connected, setConnected] = useState(true); // Mock as always connected

  useEffect(() => {
    if (!districtId) return;

    // Mock data instead of Firebase
    const mockData = {
      alerts: [
        { id: '1', type: 'crime', message: 'High crime activity detected', timestamp: new Date().toISOString() },
        { id: '2', type: 'patrol', message: 'Patrol unit deployed', timestamp: new Date().toISOString() }
      ],
      incidents: [
        { id: '1', type: 'drug', location: 'Main Street', severity: 'high', timestamp: new Date().toISOString() },
        { id: '2', type: 'gang', location: 'Park Area', severity: 'medium', timestamp: new Date().toISOString() }
      ],
      predictions: [
        { id: '1', type: 'hotspot', confidence: 0.85, location: 'Commercial District', timestamp: new Date().toISOString() }
      ],
      lastUpdated: new Date().toISOString()
    };

    setData(mockData);
    setConnected(true);
  }, [districtId]);

  const updateData = async (path: string, newData: any) => {
    // Mock update - just log for now
    console.log(`Mock update to ${path}:`, newData);
  };

  const addAlert = async (alert: any) => {
    // Mock add alert - just add to local state
    const newAlert = {
      ...alert,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    setData(prev => ({
      ...prev,
      alerts: [...prev.alerts, newAlert],
      lastUpdated: new Date().toISOString()
    }));
  };

  return { data, connected, updateData, addAlert };
};