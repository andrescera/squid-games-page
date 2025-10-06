import { Hero } from '@/components/Hero';
import { StreamerGrid } from '@/components/StreamerGrid';
import streamersData from '@/data/streamers.json';
import { Streamer } from '@/lib/types';

export const metadata = {
  title: 'Squid Games Colombia Minecraft - Evento de Supervivencia Épico',
  description: '145+ streamers compitiendo en los juegos más mortales de Minecraft. Descarga el mod y únete al evento.',
  keywords: 'Squid Games Colombia, Minecraft, Mod, Streaming, Kick, Gaming, Survival',
  openGraph: {
    title: 'Squid Games Colombia Minecraft',
    description: '145+ streamers compitiendo en los juegos más mortales de Minecraft',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squid Games Colombia Minecraft',
    description: '145+ streamers compitiendo en el evento más épico de Minecraft',
  },
};

export default function HomePage() {
  const streamers = streamersData as Streamer[];

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <StreamerGrid streamers={streamers} />
      
      {/* Footer */}
      <footer className="bg-squid-gray border-t border-squid-red/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Squid Games Colombia Minecraft - Evento de la comunidad
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a 
              href="https://x.com/SquidColombia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-squid-red transition-colors"
            >
              Twitter/X
            </a>
            <a 
              href="https://kick.com/elmune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-squid-red transition-colors"
            >
              Transmisión Principal
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            © 2025 Squid Games Colombia Minecraft. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}