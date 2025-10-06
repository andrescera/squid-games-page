'use client';

import { motion } from 'framer-motion';
import { Construction, Film } from 'lucide-react';

interface ClipsGalleryProps {
  streamerId: string;
}

export function ClipsGallery({ streamerId: _streamerId }: ClipsGalleryProps) {
  return (
    <div className="relative">
      {/* Placeholder for clips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-squid-gray/30 border-2 border-dashed border-squid-red/30 rounded-lg p-12 text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="inline-block mb-4"
        >
          <Film className="w-16 h-16 text-squid-red/50" />
        </motion.div>
        
        <h4 className="text-xl font-bold text-white mb-2">
          🚧 Próximamente 🚧
        </h4>
        
        <p className="text-gray-400 mb-4 max-w-md mx-auto">
          Los mejores clips y momentos destacados estarán disponibles durante el evento
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Construction className="w-4 h-4" />
          <span>Galería en construcción</span>
        </div>

        {/* Mock clips grid - for visual reference */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 opacity-20">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="aspect-video bg-squid-red/10 rounded border border-squid-red/20 flex items-center justify-center"
            >
              <Film className="w-8 h-8 text-squid-red/30" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Future enhancement note */}
      <p className="text-xs text-gray-600 mt-4 text-center italic">
        Esta galería se actualizará con los clips más populares del streamer una vez que el evento comience
      </p>
    </div>
  );
}