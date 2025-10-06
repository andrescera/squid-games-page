export interface Streamer {
  id: string;
  nombre: string;
  kickLink?: string;
  twitchLink?: string;
  youtubeLink?: string;
  platform: 'Kick' | 'Twitch' | 'Pendiente';
  ccv?: number;
  kickPartner: boolean;
  statusKickPartner: string;
  confirmado: boolean;
  anunciado: boolean;
  enDiscord: boolean;
  avatarUrl?: string;
  isLive?: boolean;
  currentViewers?: number;
  lastUpdated?: number;
}

export interface Clip {
  id: string;
  streamerId: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  createdAt: string;
  duration: number;
}

export interface StreamerWithClips extends Streamer {
  clips?: Clip[];
}

export interface LiveStatus {
  isLive: boolean;
  currentViewers: number;
  lastUpdated: number;
}