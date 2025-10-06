'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, ExternalLink, Radio } from 'lucide-react';
import { Streamer } from '@/lib/types';
import { fetchStreamerAvatar } from '@/lib/avatar-fetcher';

interface StreamerCardProps {
  streamer: Streamer;
  onClick: () => void;
  index: number;
  liveStatus?: { isLive: boolean; currentViewers: number };
}

export function StreamerCard({ streamer, onClick, index, liveStatus }: StreamerCardProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAvatar = async () => {
      try {
        const url = await fetchStreamerAvatar(
          streamer.kickLink,
          streamer.twitchLink,
          streamer.nombre
        );
        if (isMounted) {
          setAvatarUrl(url);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading avatar:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAvatar();

    return () => {
      isMounted = false;
    };
  }, [streamer]);

  const platformColor = streamer.platform === 'Kick' 
    ? 'bg-green-500/20 text-green-400 border-green-500/50' 
    : streamer.platform === 'Twitch'
    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    : 'bg-gray-500/20 text-gray-400 border-gray-500/50';

  const platformIcon = streamer.platform === 'Kick' ? '🟢' : streamer.platform === 'Twitch' ? '🟣' : '⏳';
  const isLive = liveStatus?.isLive || false;
  const viewerCount = liveStatus?.currentViewers || streamer.ccv || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className={`relative h-full backdrop-blur-sm border-squid-red/30 hover:border-squid-red hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group ${
          isLive ? 'bg-squid-gray/90 ring-2 ring-squid-mint/50' : 'bg-squid-gray/80'
        }`}
      >
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 right-2 z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1 bg-squid-mint text-black px-2 py-1 rounded-sm text-xs font-bold shadow-lg"
            >
              <Radio className="w-3 h-3" />
              VIVO
            </motion.div>
          </div>
        )}

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isLive ? 'from-squid-mint/0 via-squid-mint/0 to-squid-mint/10' : 'from-squid-red/0 via-squid-red/0 to-squid-red/10'
        }`} />
        
        <CardContent className="relative p-4 flex flex-col items-center text-center h-full">
          {/* Avatar */}
          <div className="relative mb-3">
            {isLoading ? (
              <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
            ) : (
              <Avatar className={`w-24 h-24 md:w-28 md:h-28 ring-2 transition-all duration-300 ${
                isLive ? 'ring-squid-mint' : 'ring-squid-red/50 group-hover:ring-squid-red'
              }`}>
                <AvatarImage
                  src={avatarUrl || undefined}
                  alt={streamer.nombre}
                  className="object-cover"
                />
                <AvatarFallback className="bg-squid-red text-white text-2xl font-bold">
                  {streamer.nombre.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Streamer Name */}
          <h3 className="font-bold text-base md:text-lg text-white mb-2 line-clamp-2 group-hover:text-squid-pink transition-colors duration-300">
            {streamer.nombre}
          </h3>

          {/* Platform Badge */}
          <Badge 
            variant="outline" 
            className={`${platformColor} mb-2 text-xs`}
          >
            {platformIcon} {streamer.platform}
          </Badge>

          {/* Stats */}
          {viewerCount > 0 && (
            <div className={`flex items-center gap-1 text-sm mb-2 ${isLive ? 'text-squid-mint font-bold' : 'text-gray-400'}`}>
              <Eye className="w-4 h-4" />
              <span>{viewerCount.toLocaleString('es-ES')}</span>
              {isLive && <span className="text-xs">ahora</span>}
            </div>
          )}

          {/* Status badges */}
          <div className="flex flex-wrap gap-1 justify-center mt-auto">
            {streamer.anunciado && (
              <Badge variant="secondary" className="text-xs bg-squid-pink/20 text-squid-pink border-squid-pink/50">
                Anunciado
              </Badge>
            )}
            {streamer.youtubeLink && (
              <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-400 border-red-500/50">
                🎥 YouTube
              </Badge>
            )}
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            <ExternalLink className="w-4 h-4 text-squid-red" />
          </motion.div>

          {/* Click hint */}
          <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click para ver más
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}