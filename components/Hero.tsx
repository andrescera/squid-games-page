'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FeaturedStreamerCard } from './FeaturedStreamerCard';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      [...Array(20)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: -20,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-squid-gray to-black">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #D32F2F 25%, transparent 25%),
            linear-gradient(-45deg, #D32F2F 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #D32F2F 75%),
            linear-gradient(-45deg, transparent 75%, #D32F2F 75%)
          `,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px',
        }} />
      </div>

      {/* Floating particles - only rendered on client to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-squid-red rounded-sm"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0.3,
              }}
              animate={{
                y: window.innerHeight + 20,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-squid-red via-squid-pink to-squid-red bg-clip-text text-transparent animate-pulse">
                SQUID GAMES
              </span>
              <br />
              <span className="inline-block text-white" style={{ textShadow: '4px 4px 0 rgba(211, 47, 47, 0.5)' }}>
                COLOMBIA
              </span>
            </h1>
            <div className="inline-block px-6 py-2 bg-squid-red/20 border-2 border-squid-red rounded">
              <p className="text-2xl md:text-3xl font-bold text-squid-mint tracking-wider">
                MINECRAFT
              </p>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Evento de Supervivencia Épico
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            145+ streamers compitiendo en los juegos más mortales de Minecraft.
            ¿Quién será el último en pie?
          </motion.p>

          {/* Featured Streamer Card */}
          <FeaturedStreamerCard />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <div className="bg-squid-gray/50 backdrop-blur-sm border border-squid-red/30 p-6 rounded-sm">
              <div className="text-4xl font-bold text-squid-red mb-2">145+</div>
              <div className="text-gray-400 uppercase text-sm tracking-wider">Participantes</div>
            </div>
            <div className="bg-squid-gray/50 backdrop-blur-sm border border-squid-mint/30 p-6 rounded-sm">
              <div className="text-4xl font-bold text-squid-mint mb-2">EN VIVO</div>
              <div className="text-gray-400 uppercase text-sm tracking-wider">Estado del Evento</div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-6 h-10 border-2 border-squid-red rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-squid-red rounded-full" />
              </div>
            </motion.div>
            <p className="text-gray-500 text-sm mt-2">Desliza para ver participantes</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}