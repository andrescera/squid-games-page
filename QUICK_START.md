# 🚀 Quick Start Guide - Squid Games Colombia Minecraft Website

## ⚡ Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
cd squid-games-website
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```
🌐 Open [http://localhost:3000](http://localhost:3000)

### 3️⃣ Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel
```

---

## 📝 Common Tasks

### Update Streamer Data
```bash
# Edit the CSV file
nano data/streamers.csv

# Parse new data
node scripts/parse-streamers.js
```

### Build for Production
```bash
npm run build
npm start
```

### Update Mod Download Link
Edit the Hero component: `components/Hero.tsx`
Look for the "Descargar Mod" button and update the URL.

---

## 🎨 Customization Points

### Colors
File: `app/globals.css`
- Change Squid Games Colombia theme colors
- Modify gradient effects
- Adjust border styles

### Hero Section
File: `components/Hero.tsx`
- Update event title
- Change statistics
- Modify CTA buttons

### Streamer Cards
File: `components/StreamerCard.tsx`
- Adjust card layout
- Change hover effects
- Modify badge styles

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
kill -9 $(lsof -t -i:3000)

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Avatars Not Loading
- Check internet connection
- Verify Kick URLs in CSV
- Check browser console for CORS errors

---

## 📱 Testing Checklist

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Hero animations working
- [ ] Streamer cards loading avatars
- [ ] Modal opens and closes
- [ ] All buttons functional
- [ ] Responsive grid layout
- [ ] Smooth scrolling

---

## 🚢 Deployment Checklist

- [ ] All environment variables set
- [ ] CSV data parsed to JSON
- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Links work (Kick, Twitter)
- [ ] SEO meta tags in place
- [ ] Favicon added (if needed)
- [ ] Analytics configured (optional)

---

## 📞 Support

- **Event Twitter**: [@SquidColombia](https://x.com/SquidColombia)
- **Main Streamer**: [El Muñe](https://kick.com/elmune)

---

**¡Buena suerte con el evento!** 🎮✨