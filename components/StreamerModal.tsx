'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Eye, Users, Radio, Youtube } from 'lucide-react';
import { Streamer, LiveStatus } from '@/lib/types';
import { fetchStreamerAvatar } from '@/lib/avatar-fetcher';
import { ClipsGallery } from './ClipsGallery';

interface StreamerModalProps {
  streamer: Streamer;
  isOpen: boolean;
  onClose: () => void;
  liveStatus?: LiveStatus;
}

export function StreamerModal({ streamer, isOpen, onClose, liveStatus }: StreamerModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchStreamerAvatar(streamer.kickLink, streamer.twitchLink, streamer.nombre)
        .then(setAvatarUrl)
        .catch(console.error);
    }
  }, [streamer, isOpen]);

  const platformColor = streamer.platform === 'Kick' 
    ? 'bg-green-500/20 text-green-400 border-green-500/50' 
    : streamer.platform === 'Twitch'
    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    : 'bg-gray-500/20 text-gray-400 border-gray-500/50';

  const isLive = liveStatus?.isLive || false;
  const currentViewers = liveStatus?.currentViewers || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-squid-gray border-squid-red/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Perfil del Streamer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Streamer Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 relative"
            >
              <Avatar className={`w-32 h-32 md:w-40 md:h-40 ring-4 ${
                isLive ? 'ring-squid-mint' : 'ring-squid-red/50'
              }`}>
                <AvatarImage 
                  src={avatarUrl || undefined} 
                  alt={streamer.nombre}
                  className="object-cover"
                />
                <AvatarFallback className="bg-squid-red text-white text-4xl font-bold">
                  {streamer.nombre.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isLive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 bg-squid-mint rounded-full p-3 shadow-lg"
                >
                  <Radio className="w-6 h-6 text-black" />
                </motion.div>
              )}
            </motion.div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {streamer.nombre}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={platformColor}>
                    {streamer.platform === 'Kick' ? '🟢' : '🟣'} {streamer.platform}
                  </Badge>
                  {streamer.confirmado && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      ✓ Confirmado
                    </Badge>
                  )}
                  {isLive && (
                    <Badge className="bg-squid-mint/20 text-squid-mint border-squid-mint/50 animate-pulse">
                      🔴 EN VIVO
                    </Badge>
                  )}
                  {streamer.anunciado && (
                    <Badge className="bg-squid-pink/20 text-squid-pink border-squid-pink/50">
                      📢 Anunciado
                    </Badge>
                  )}
                  {streamer.enDiscord && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                      💬 En Discord
                    </Badge>
                  )}
                  {streamer.kickPartner && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                      ⭐ Partner
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              {(currentViewers > 0 || streamer.ccv) && (
                <div className="flex items-center gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Eye className={`w-5 h-5 ${isLive ? 'text-squid-mint' : 'text-squid-red'}`} />
                    <div>
                      <div className={`text-2xl font-bold ${isLive ? 'text-squid-mint' : 'text-white'}`}>
                        {(currentViewers || streamer.ccv || 0).toLocaleString('es-ES')}
                      </div>
                      <div className="text-xs text-gray-400">
                        {isLive ? 'Espectadores ahora' : 'Promedio CCV'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {streamer.kickLink && (
                  <Button
                    onClick={() => window.open(streamer.kickLink, '_blank')}
                    className={`${
                      isLive 
                        ? 'bg-squid-mint/20 hover:bg-squid-mint/30 text-squid-mint border-squid-mint/50'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50'
                    } border`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {isLive ? 'Ver en Vivo en Kick' : 'Ver en Kick'}
                  </Button>
                )}
                {streamer.twitchLink && (
                  <Button
                    onClick={() => window.open(streamer.twitchLink, '_blank')}
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en Twitch
                  </Button>
                )}
                {streamer.youtubeLink && (
                  <Button
                    onClick={() => window.open(streamer.youtubeLink, '_blank')}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Ver en YouTube
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-squid-red/30" />

          {/* Clips Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📺</span>
              Clips Destacados
            </h3>
            <ClipsGallery streamerId={streamer.id} />
          </div>

          {/* Social Follow Section */}
          <div className="bg-squid-gray/50 border border-squid-red/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users className="w-4 h-4" />
              <span>
                {isLive 
                  ? `¡${streamer.nombre} está en vivo ahora! No te pierdas la acción.`
                  : `Sigue a ${streamer.nombre} para no perderte ninguna transmisión del evento`
                }
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}