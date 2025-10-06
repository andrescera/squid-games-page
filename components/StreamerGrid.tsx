'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StreamerCard } from './StreamerCard';
import { StreamerModal } from './StreamerModal';
import { Streamer, LiveStatus } from '@/lib/types';

interface StreamerGridProps {
  streamers: Streamer[];
}

export function StreamerGrid({ streamers }: StreamerGridProps) {
  const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveStatuses, setLiveStatuses] = useState<Record<string, LiveStatus>>({});

  useEffect(() => {
    const fetchLiveStatuses = async () => {
      try {
        const response = await fetch('/api/streamers/live-status');
        if (response.ok) {
          const data = await response.json();
          setLiveStatuses(data);
        }
      } catch (error) {
        console.error('Error fetching live statuses:', error);
      }
    };

    fetchLiveStatuses();
    
    // Refresh every minute
    const interval = setInterval(fetchLiveStatuses, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStreamerClick = (streamer: Streamer) => {
    setSelectedStreamer(streamer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStreamer(null), 300);
  };

  // Separate live and offline streamers
  const liveStreamers = streamers.filter(s => liveStatuses[s.id]?.isLive);
  const offlineStreamers = streamers.filter(s => !liveStatuses[s.id]?.isLive);

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-black via-squid-gray/50 to-black">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-squid-red via-squid-pink to-squid-red bg-clip-text text-transparent">
                Participantes
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              145+ streamers listos para competir en los juegos más intensos de Minecraft
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-squid-mint animate-pulse" />
                <span className="text-gray-400">
                  En Vivo: <span className="text-white font-bold">{liveStreamers.length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-squid-red" />
                <span className="text-gray-400">
                  Confirmados: <span className="text-white font-bold">{streamers.length}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Live Streamers Section */}
          {liveStreamers.length > 0 && (
            <div className="mb-12">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-squid-mint mb-6 flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-squid-mint animate-pulse" />
                En Vivo Ahora
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              >
                {liveStreamers.map((streamer, index) => (
                  <StreamerCard
                    key={streamer.id}
                    streamer={streamer}
                    onClick={() => handleStreamerClick(streamer)}
                    index={index}
                    liveStatus={liveStatuses[streamer.id]}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Offline Streamers Section */}
          {offlineStreamers.length > 0 && (
            <div>
              {liveStreamers.length > 0 && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-gray-400 mb-6"
                >
                  Todos los Participantes
                </motion.h3>
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: liveStreamers.length > 0 ? 0.2 : 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              >
                {offlineStreamers.map((streamer, index) => (
                  <StreamerCard
                    key={streamer.id}
                    streamer={streamer}
                    onClick={() => handleStreamerClick(streamer)}
                    index={index}
                    liveStatus={liveStatuses[streamer.id]}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Total count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm">
              Mostrando {streamers.length} participantes confirmados
              {liveStreamers.length > 0 && ` • ${liveStreamers.length} en vivo`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedStreamer && (
        <StreamerModal
          streamer={selectedStreamer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          liveStatus={liveStatuses[selectedStreamer.id]}
        />
      )}
    </>
  );
}