'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink, Eye, Radio } from 'lucide-react';
import { fetchStreamerAvatar } from '@/lib/avatar-fetcher';

export function FeaturedStreamerCard() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Fetch avatar
    fetchStreamerAvatar('https://kick.com/elmune', undefined, 'El Muñe')
      .then(setAvatarUrl)
      .catch(console.error);

    // Fetch live status
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/streamers/live-status');
        const data = await res.json();
        const muneStatus = data['el-mune'];
        if (muneStatus) {
          setIsLive(muneStatus.isLive);
          setViewers(muneStatus.currentViewers);
        }
      } catch (error) {
        console.error('Error fetching live status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-squid-red/20 via-squid-gray to-squid-gray border-2 border-squid-red shadow-2xl shadow-squid-red/30">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-squid-red/10 via-transparent to-squid-pink/10 animate-pulse" />
        
        {/* Live indicator ribbon */}
        {isLive && (
          <div className="absolute top-4 -right-12 bg-squid-mint text-black px-12 py-1 rotate-45 text-sm font-bold shadow-lg z-10">
            EN VIVO
          </div>
        )}

        <CardContent className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={isLive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-squid-red shadow-xl">
                  <AvatarImage src={avatarUrl || undefined} alt="El Muñe" />
                  <AvatarFallback className="bg-squid-red text-white text-4xl font-bold">
                    EM
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              {isLive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 bg-squid-mint rounded-full p-2 shadow-lg"
                >
                  <Radio className="w-6 h-6 text-black" />
                </motion.div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    El Muñe
                  </h3>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                    ⭐ Anfitrión
                  </Badge>
                </div>
                <p className="text-gray-400 text-lg">
                  Streamer Principal del Evento
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6">
                {isLive && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-squid-mint" />
                    <span className="text-xl font-bold text-white">
                      {viewers.toLocaleString('es-ES')}
                    </span>
                    <span className="text-gray-400 text-sm">espectadores</span>
                  </div>
                )}
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                  🟢 Kick
                </Badge>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base max-w-xl">
                {isLive
                  ? "¡En vivo ahora! Únete a la transmisión principal del evento Squid Games Colombia Minecraft."
                  : "El anfitrión principal del evento. Síguelo para no perderte ningún momento épico."
                }
              </p>

              {/* CTA Button */}
              <Button
                size="lg"
                onClick={() => window.open('https://kick.com/elmune', '_blank')}
                className={`${
                  isLive 
                    ? 'bg-squid-mint hover:bg-squid-mint/80 text-black' 
                    : 'bg-squid-red hover:bg-squid-dark-red text-white'
                } font-bold text-lg px-8 py-6 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {isLive ? 'Ver Transmisión en Vivo' : 'Visitar Canal'}
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-squid-red to-transparent" />
      </Card>
    </motion.div>
  );
}