import React, { useState, useEffect } from 'react';
import { Camera, Play, Pause, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface CCTVPanelProps {
  selectedDistrict: string;
  onClose: () => void;
}

interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastMotion: string;
  streamUrl: string;
}

const CCTVPanel: React.FC<CCTVPanelProps> = ({ selectedDistrict, onClose }) => {
  const [cameras, setCameras] = useState<CCTVCamera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Mock CCTV data
    const mockCameras: CCTVCamera[] = [
      {
        id: '1',
        name: 'Main Street Intersection',
        location: 'Alajuelita Centro',
        status: 'online',
        lastMotion: '2 minutes ago',
        streamUrl: 'rtmp://stream.example.com/cam1'
      },
      {
        id: '2',
        name: 'Park Entrance',
        location: 'Parque Central',
        status: 'online',
        lastMotion: '15 minutes ago',
        streamUrl: 'rtmp://stream.example.com/cam2'
      },
      {
        id: '3',
        name: 'School Zone',
        location: 'Escuela Primaria',
        status: 'maintenance',
        lastMotion: '1 hour ago',
        streamUrl: 'rtmp://stream.example.com/cam3'
      },
      {
        id: '4',
        name: 'Commercial District',
        location: 'Zona Comercial',
        status: 'offline',
        lastMotion: '3 hours ago',
        streamUrl: 'rtmp://stream.example.com/cam4'
      }
    ];

    setCameras(mockCameras);
  }, [selectedDistrict]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return AlertTriangle;
      case 'maintenance': return AlertTriangle;
      default: return Camera;
    }
  };

  const startStream = (cameraId: string) => {
    setSelectedCamera(cameraId);
    setIsStreaming(true);
    toast.success('CCTV stream started');
    
    // Simulate motion detection after 3 seconds
    setTimeout(() => {
      toast('Motion detected!', {
        icon: '🚨',
        duration: 4000,
      });
    }, 3000);
  };

  const stopStream = () => {
    setIsStreaming(false);
    setSelectedCamera(null);
    toast.success('Stream stopped');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>CCTV Surveillance</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Live Stream View */}
          {selectedCamera && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                {isStreaming ? (
                  <div className="text-center text-white">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p>Live Stream Active</p>
                    <p className="text-sm opacity-75">
                      Camera {cameras.find(c => c.id === selectedCamera)?.name}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Camera className="w-16 h-16 mx-auto mb-4" />
                    <p>Stream Offline</p>
                  </div>
                )}
                
                {/* Stream Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                  <button
                    onClick={() => isStreaming ? stopStream() : startStream(selectedCamera)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isStreaming
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isStreaming ? 'Stop' : 'Start'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Camera List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Available Cameras ({cameras.filter(c => c.status === 'online').length}/{cameras.length} online)
            </h4>
            
            {cameras.map((camera) => {
              const StatusIcon = getStatusIcon(camera.status);
              
              return (
                <motion.div
                  key={camera.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedCamera === camera.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => camera.status === 'online' && setSelectedCamera(camera.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(camera.status)}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {camera.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {camera.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-xs font-medium ${getStatusColor(camera.status)}`}>
                        {camera.status}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {camera.lastMotion}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Motion Detection Alert */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Motion detection active on {cameras.filter(c => c.status === 'online').length} cameras
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CCTVPanel;