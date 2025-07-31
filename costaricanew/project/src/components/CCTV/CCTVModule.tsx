import React, { useState, useEffect } from 'react';
import { Camera, Maximize, Minimize, Play, Pause, Volume2, VolumeX, Wifi, WifiOff, Grid3X3, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import toast from 'react-hot-toast';

interface CCTVFeed {
  id: string;
  name: string;
  district: string;
  status: 'online' | 'offline' | 'maintenance';
  youtubeId: string;
  location: string;
  lastActivity: string;
}

const CCTVModule: React.FC = () => {
  const [feeds, setFeeds] = useState<CCTVFeed[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<CCTVFeed | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gridView, setGridView] = useState<'2x2' | '3x2' | '2x3'>('2x2');
  const [playerStates, setPlayerStates] = useState<Record<string, { playing: boolean; muted: boolean }>>({});

  useEffect(() => {
    // Initialize CCTV feeds with YouTube live streams
    const mockFeeds: CCTVFeed[] = [
      {
        id: 'cam-001',
        name: 'Camera 1: Central Alajuelita',
        district: 'Alajuelita',
        status: 'online',
        youtubeId: 'rnXIjl_Rzy4', // Extract ID from https://www.youtube.com/live/rnXIjl_Rzy4
        location: 'Main Street & Central Avenue',
        lastActivity: '2 minutes ago'
      },
      {
        id: 'cam-002',
        name: 'Camera 2: San Josecito',
        district: 'San Josecito',
        status: 'online',
        youtubeId: 'AAlo3eCPVbk', // Extract ID from the second URL
        location: 'Commercial District',
        lastActivity: '5 minutes ago'
      },
      {
        id: 'cam-003',
        name: 'Camera 3: Concepción',
        district: 'Concepción',
        status: 'online',
        youtubeId: '57w2gYXjRic', // Extract ID from the third URL
        location: 'Residential Area',
        lastActivity: '1 minute ago'
      },
      {
        id: 'cam-004',
        name: 'Camera 4: San Felipe',
        district: 'San Felipe',
        status: 'maintenance',
        youtubeId: 'jfKfPfyJRdk', // Backup stream
        location: 'School Zone',
        lastActivity: '1 hour ago'
      },
      {
        id: 'cam-005',
        name: 'Camera 5: Tejarcillos',
        district: 'Tejarcillos',
        status: 'offline',
        youtubeId: 'placeholder',
        location: 'Park Area',
        lastActivity: '3 hours ago'
      },
      {
        id: 'cam-006',
        name: 'Camera 6: San Antonio',
        district: 'San Antonio',
        status: 'online',
        youtubeId: 'jfKfPfyJRdk', // Another backup stream
        location: 'Industrial Zone',
        lastActivity: '30 seconds ago'
      }
    ];

    setFeeds(mockFeeds);

    // Initialize player states
    const initialStates: Record<string, { playing: boolean; muted: boolean }> = {};
    mockFeeds.forEach(feed => {
      initialStates[feed.id] = { playing: feed.status === 'online', muted: true };
    });
    setPlayerStates(initialStates);
  }, []);

  const togglePlay = (feedId: string) => {
    setPlayerStates(prev => ({
      ...prev,
      [feedId]: {
        ...prev[feedId],
        playing: !prev[feedId]?.playing
      }
    }));
  };

  const toggleMute = (feedId: string) => {
    setPlayerStates(prev => ({
      ...prev,
      [feedId]: {
        ...prev[feedId],
        muted: !prev[feedId]?.muted
      }
    }));
  };

  const openFullscreen = (feed: CCTVFeed) => {
    setSelectedFeed(feed);
    setIsFullscreen(true);
    toast.success(`Opened ${feed.name} in fullscreen`);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedFeed(null);
  };

  const getStatusColor = (status: CCTVFeed['status']) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: CCTVFeed['status']) => {
    switch (status) {
      case 'online': return Wifi;
      case 'offline': return WifiOff;
      case 'maintenance': return Camera;
      default: return Camera;
    }
  };

  const getGridColumns = () => {
    switch (gridView) {
      case '2x2': return 'grid-cols-1 md:grid-cols-2';
      case '3x2': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case '2x3': return 'grid-cols-1 md:grid-cols-2';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  const fullscreenOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      fs: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Camera className="w-6 h-6" />
            <span>CCTV Surveillance</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Live camera feeds from Alajuelita districts
          </p>
        </div>

        {/* Grid View Controls */}
        <div className="flex items-center space-x-2 flex-wrap">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {(['2x2', '3x2', '2x3'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setGridView(view)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  gridView === view
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <Grid3X3 className="w-4 h-4" />
            <span>Grid View</span>
          </div>
        </div>
      </motion.div>

      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {feeds.filter(f => f.status === 'online').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {feeds.filter(f => f.status === 'offline').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Offline</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {feeds.filter(f => f.status === 'maintenance').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {feeds.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Cameras</p>
          </div>
        </div>
      </motion.div>

      {/* Camera Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`grid ${getGridColumns()} gap-4 lg:gap-6`}
      >
        {feeds.map((feed, index) => {
          const StatusIcon = getStatusIcon(feed.status);
          const playerState = playerStates[feed.id] || { playing: false, muted: true };

          return (
            <motion.div
              key={feed.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden w-full"
            >
              {/* Feed Header */}
              <div className="p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-xs lg:text-sm">
                      {feed.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {feed.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(feed.status)}`} />
                    <span className={`text-xs font-medium ${getStatusColor(feed.status)}`}>
                      {feed.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video bg-gray-900 w-full">
                {feed.status === 'online' ? (
                  <div className="w-full h-full">
                    <YouTube
                      videoId={feed.youtubeId}
                      opts={youtubeOpts}
                      className="w-full h-full"
                      iframeClassName="w-full h-full"
                      onError={() => {
                        toast.error(`Failed to load ${feed.name}`);
                        setFeeds(prev => prev.map(f => 
                          f.id === feed.id ? { ...f, status: 'offline' } : f
                        ));
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <div className="text-center text-gray-400">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        {feed.status === 'offline' ? 'Camera Offline' : 'Under Maintenance'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                {feed.status === 'online' && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 group">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => togglePlay(feed.id)}
                          className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
                        >
                          {playerState.playing ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => toggleMute(feed.id)}
                          className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
                        >
                          {playerState.muted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => openFullscreen(feed)}
                        className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Feed Info */}
              <div className="p-2 lg:p-3 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last activity: {feed.lastActivity}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {feed.district}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && selectedFeed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <div>
                <h2 className="text-lg font-semibold">{selectedFeed.name}</h2>
                <p className="text-sm text-gray-300">{selectedFeed.location}</p>
              </div>
              <button
                onClick={closeFullscreen}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Minimize className="w-6 h-6" />
              </button>
            </div>

            {/* Fullscreen Video */}
            <div className="flex-1 relative">
              {selectedFeed.status === 'online' ? (
                <YouTube
                  videoId={selectedFeed.youtubeId}
                  opts={fullscreenOpts}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center text-gray-400">
                    <Camera className="w-24 h-24 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Camera Unavailable</p>
                    <p className="text-sm mt-2">
                      {selectedFeed.status === 'offline' ? 'Camera is offline' : 'Under maintenance'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Controls */}
            <div className="p-4 bg-gray-900 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedFeed.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm">{selectedFeed.status}</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    {selectedFeed.district} District
                  </span>
                </div>
                
                <div className="text-sm text-gray-300">
                  Press ESC to exit fullscreen
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CCTVModule;