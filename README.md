# 🎮 Squid Games Minecraft - Website del Evento

Un sitio web visualmente impresionante para el evento "Squid Games Minecraft" que presenta 145+ streamers participantes, con descarga del mod y galerías de clips.

## 🌟 Características

- ✨ **Diseño Moderno**: Tema oscuro inspirado en Squid Game con elementos blocky de Minecraft
- 🎨 **Animaciones Suaves**: Transiciones fluidas usando Framer Motion
- 📱 **Totalmente Responsivo**: Optimizado para móvil, tablet y escritorio
- 🎯 **145+ Streamers**: Tarjetas de streamers con avatares dinámicos de Kick/Twitch
- 🖼️ **Sistema Modal**: Expansión de tarjetas para ver detalles de cada streamer
- 🎬 **Galería de Clips**: Estructura lista para integrar clips destacados
- 🚀 **Alto Rendimiento**: Construido con Next.js 14+ y optimizaciones modernas
- 🌐 **Todo en Español**: Interfaz completamente localizada

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Animaciones**: Framer Motion
- **Deployment**: Vercel

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- npm o pnpm

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd squid-games-website

# Instalar dependencias
npm install

# Parsear los datos de streamers (si el CSV ha cambiado)
node scripts/parse-streamers.js

# Ejecutar el servidor de desarrollo
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

### Build de Producción

```bash
# Crear build optimizado
npm run build

# Ejecutar build de producción
npm start
```

## 📁 Estructura del Proyecto

```
squid-games-website/
├── app/
│   ├── layout.tsx              # Layout raíz con metadata
│   ├── page.tsx                # Página principal
│   └── globals.css             # Estilos globales con tema Squid Game
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── skeleton.tsx
│   │   ├── badge.tsx
│   │   └── avatar.tsx
│   ├── Hero.tsx                # Sección héroe principal
│   ├── StreamerCard.tsx        # Tarjeta individual de streamer
│   ├── StreamerGrid.tsx        # Grid responsivo de streamers
│   ├── StreamerModal.tsx       # Modal expandido de detalles
│   └── ClipsGallery.tsx        # Galería de clips (placeholder)
├── data/
│   ├── streamers.csv           # Datos fuente CSV
│   └── streamers.json          # Datos parseados
├── lib/
│   ├── types.ts                # Interfaces TypeScript
│   ├── utils.ts                # Utilidades shadcn/ui
│   └── avatar-fetcher.ts       # Fetcher de avatares Kick/Twitch
├── scripts/
│   └── parse-streamers.js      # Script para parsear CSV
└── public/
    └── assets/                 # Assets estáticos
```

## 🎨 Paleta de Colores

- **Squid Black**: `#000000` - Fondo principal
- **Squid Red**: `#D32F2F` - Color primario, CTAs
- **Dark Red**: `#8B0000` - Estados hover
- **Pink**: `#FF6B9D` - Acentos secundarios
- **Mint Green**: `#7ED957` - Indicadores de éxito
- **Dark Gray**: `#1A1A1A` - Tarjetas y secciones

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_GITHUB_RELEASES_URL=https://github.com/usuario/repo/releases
```

### Actualizar Datos de Streamers

1. Actualiza el archivo `data/streamers.csv`
2. Ejecuta el script de parseo:
   ```bash
   node scripts/parse-streamers.js
   ```
3. Los datos se actualizarán en `data/streamers.json`

### Personalización de Colores

Edita `app/globals.css` para modificar las variables de color del tema:

```css
:root {
  --background: oklch(0 0 0);
  --primary: oklch(0.527 0.193 27.325);
  /* ... más variables */
}
```

## 🚀 Deploy en Vercel

### Deploy Automático

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El deploy se ejecutará en cada push

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Configuración de Vercel

El archivo `vercel.json` ya está configurado con:
- Build command
- Output directory
- Framework detection

## 📝 Componentes Principales

### Hero Component

Hero section animado con:
- Título principal animado
- CTAs para descarga y transmisión
- Estadísticas del evento
- Partículas flotantes
- Indicador de scroll

### StreamerCard Component

Tarjeta de streamer con:
- Avatar dinámico (fetch desde Kick/Twitch)
- Nombre del streamer
- Badge de plataforma
- Estadísticas CCV
- Estados hover interactivos
- Sistema de esqueletos de carga

### StreamerModal Component

Modal expandible con:
- Información detallada del streamer
- Links a canales sociales
- Galería de clips (placeholder)
- Badges de estado
- Animaciones de entrada/salida

## 🔄 Fetching de Avatares

El sistema soporta:
- **Kick**: Fetch desde API pública de Kick
- **Twitch**: Placeholder con UI Avatars (puede mejorarse con API de Twitch)
- **Cache**: Sistema de cache en localStorage (24h TTL)
- **Fallbacks**: Avatares genéricos en caso de error

## 🎬 Galería de Clips (Futura Mejora)

Estructura lista para:
- Integración con APIs de Kick/Twitch
- Curación manual de clips mediante JSON
- Sistema de lightbox para reproducción
- Filtrado por popularidad/fecha

## 🐛 Solución de Problemas

### Los avatares no cargan

1. Verifica la conexión a internet
2. Revisa la consola del navegador para errores CORS
3. Confirma que las URLs de Kick sean correctas

### Error en el build

```bash
# Limpia el caché y reinstala
rm -rf .next node_modules
npm install
npm run build
```

### Estilos no se aplican

1. Verifica que `globals.css` esté importado en `layout.tsx`
2. Limpia el caché de Tailwind:
   ```bash
   npm run dev -- --turbo
   ```

## 📱 Testing Responsivo

El sitio ha sido probado en:
- 📱 Mobile: 375px - 767px
- 📱 Tablet: 768px - 1023px
- 💻 Desktop: 1024px+
- 🖥️ Large Desktop: 1536px+

## 🎯 Próximas Mejoras

- [ ] Integración real de clips desde APIs
- [ ] Indicadores de estado live/offline
- [ ] Sistema de búsqueda y filtrado de streamers
- [ ] Ordenamiento por CCV, nombre, plataforma
- [ ] Temporizador de cuenta regresiva para el evento
- [ ] Panel de administración para curación de contenido
- [ ] Soporte multilenguaje (inglés/español)
- [ ] Analytics y tracking de visitantes

## 📄 Licencia

Este proyecto es parte del evento comunitario Squid Games Minecraft.

## 🙏 Créditos

- Diseño inspirado en Netflix's Squid Game
- Elementos visuales de Minecraft
- Comunidad de streamers de Kick Colombia
- Streamer principal: [El Muñe](https://kick.com/elmune)
- Twitter del evento: [@SquidColombia](https://x.com/SquidColombia)

## 📞 Soporte

Para reportar problemas o sugerir mejoras, por favor contacta a través de:
- Twitter: [@SquidColombia](https://x.com/SquidColombia)
- Kick: [elmune](https://kick.com/elmune)

---

**¡Que gane el mejor!** 🎮🔥