const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../data/streamers.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

const streamers = [];

// Helper to extract YouTube link from text
function extractYouTubeLink(text) {
  if (!text) return undefined;
  
  // Common YouTube URL patterns
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:c\/|channel\/|user\/|@)?([a-zA-Z0-9_-]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Return full URL
      if (match[0].startsWith('http')) {
        return match[0];
      }
      return `https://youtube.com/@${match[1]}`;
    }
  }
  
  return undefined;
}

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const values = line.split(',');
  
  // Skip if no name
  if (!values[0] || values[0].trim() === '' || values[0] === 'SUPLENCIA') continue;
  
  const nombre = values[0].trim();
  const link = values[1] ? values[1].trim() : '';
  const platform = values[2] ? values[2].trim() : 'Pendiente';
  const ccvStr = values[3] ? values[3].trim().replace(/[,.]/g, '') : '';
  const ccv = ccvStr && !isNaN(parseInt(ccvStr)) ? parseInt(ccvStr) : undefined;
  const kickPartner = values[4] === 'TRUE';
  const statusKickPartner = values[5] || 'Pendiente';
  const confirmado = values[6] === 'Confirmado';
  const anunciado = values[7] === 'TRUE';
  const enDiscord = values[8] === 'TRUE';
  
  // Determine platform and links
  let kickLink = undefined;
  let twitchLink = undefined;
  let youtubeLink = undefined;
  let finalPlatform = 'Kick'; // Default to Kick
  
  if (link) {
    if (link.includes('kick.com')) {
      kickLink = link;
      finalPlatform = 'Kick';
    } else if (link.includes('twitch.tv')) {
      twitchLink = link;
      finalPlatform = 'Twitch';
    }
    
    // Try to extract YouTube link from the link field
    youtubeLink = extractYouTubeLink(link);
  }
  
  // Generate ID from nombre
  const id = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  const streamer = {
    id,
    nombre,
    kickLink,
    twitchLink,
    youtubeLink,
    platform: finalPlatform,
    ccv,
    kickPartner,
    statusKickPartner,
    confirmado,
    anunciado,
    enDiscord
  };
  
  streamers.push(streamer);
}

// Sort by nombre
streamers.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

// Write to JSON
const outputPath = path.join(__dirname, '../data/streamers.json');
fs.writeFileSync(outputPath, JSON.stringify(streamers, null, 2), 'utf-8');

console.log(`✅ Parsed ${streamers.length} streamers successfully!`);
console.log(`📝 Output written to: ${outputPath}`);

// Log streamers with YouTube links
const withYouTube = streamers.filter(s => s.youtubeLink);
if (withYouTube.length > 0) {
  console.log(`🎥 Found ${withYouTube.length} streamers with YouTube links`);
}