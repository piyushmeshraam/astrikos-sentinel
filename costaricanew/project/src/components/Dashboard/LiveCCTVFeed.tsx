import React, { useState, useEffect } from 'react';
import { Camera, Play, Pause, Maximize, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface LiveCCTVFeedProps {
  district: string;
}

const LiveCCTVFeed: React.FC<LiveCCTVFeedProps> = ({ district }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [streamStatus, setStreamStatus] = useState<'online' | 'offline' | 'connecting'>('online');

  // Simulate motion detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setMotionDetected(true);
        toast('Motion detected in CCTV feed!', {
          icon: '🚨',
          duration: 3000,
        });
        setTimeout(() => setMotionDetected(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Stream paused' : 'Stream resumed');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Live CCTV - {district}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              streamStatus === 'online' ? 'bg-green-500' :
              streamStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {streamStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Video Container */}
        <div className="aspect-video bg-gray-900 relative overflow-hidden">
          {/* Simulated Video Feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Grid overlay to simulate camera view */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-600" />
                ))}
              </div>
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {new Date().toLocaleString()}
            </div>

            {/* Motion detection overlay */}
            {motionDetected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border-4 border-red-500 bg-red-500 bg-opacity-10"
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-center">
                  <AlertTriangle className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-lg font-bold">MOTION DETECTED</p>
                </div>
              </motion.div>
            )}

            {/* Simulated street scene */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-700 to-transparent" />
            
            {/* Simulated moving elements */}
            <motion.div
              animate={{ x: [0, 300, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-16 w-4 h-2 bg-yellow-400 rounded-sm"
            />
          </div>

          {/* Play/Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Play className="w-16 h-16 text-white" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Feed Info */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Camera ID</p>
            <p className="font-medium text-gray-900 dark:text-white">CAM-{district.toUpperCase()}-01</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Resolution</p>
            <p className="font-medium text-gray-900 dark:text-white">1080p HD</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Last Motion</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {motionDetected ? 'Now' : '3 min ago'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Recording</p>
            <p className="font-medium text-green-600">Active</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveCCTVFeed;