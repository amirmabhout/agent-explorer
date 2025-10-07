# Asset Setup Guide

This project uses free pixel art assets from itch.io. Follow these steps to download and set up the assets.

## 📦 Recommended Asset Packs

### 1. **Background - Central City** (PRIORITY)
**Link:** https://anokolisa.itch.io/sidescroller-shooter-central-city
- **Download:** FREE - Sidescroller Shooter - Central City
- **What to use:** Background layers (parallax)
- **Place in:** `public/assets/backgrounds/`
- **Files needed:** All PNG background layers

### 2. **Characters - Cyberpunk Character Pack** (PRIORITY)
**Link:** https://oco.itch.io/cyberpunk-character-pack
- **Download:** Free Cyberpunk Character Pack
- **What to use:** Main character + merchant sprites
- **Place in:** `public/assets/characters/`
- **Files needed:** Character sprite sheets (idle, walk animations)

### 3. **Shop Buildings - Retro Cybercity**
**Link:** https://everlyspixelsandpens.itch.io/retro-cybercity-streets-tileset
- **Download:** Retro Cybercity STREETS Tileset
- **What to use:** Building/shop tiles
- **Place in:** `public/assets/shops/`
- **Files needed:** Tileset PNG files

### 4. **Alternative Background - Synth Cities**
**Link:** https://ansimuz.itch.io/synth-cities-environment
- **Download:** Synth Cities Environment
- **What to use:** Alternative cyberpunk backgrounds
- **Place in:** `public/assets/backgrounds/`

### 5. **Alternative Characters - Streets of Fight**
**Link:** https://ansimuz.itch.io/streets-of-fight
- **Download:** Streets of Fight assets
- **What to use:** Character sprites and urban elements
- **Place in:** `public/assets/characters/`

## 📁 Directory Structure

After downloading, your structure should look like:

```
public/assets/
├── backgrounds/
│   ├── layer1_sky.png
│   ├── layer2_buildings.png
│   ├── layer3_foreground.png
│   └── ... (all background layers)
├── characters/
│   ├── player_idle.png
│   ├── player_walk.png
│   ├── merchant_idle.png
│   └── ... (character spritesheets)
├── shops/
│   ├── shop_tileset.png
│   └── ... (shop building tiles)
└── ui/
    └── ... (UI elements if needed)
```

## 🚀 Quick Start

1. Visit each link above
2. Download the free asset packs
3. Extract the ZIP files
4. Copy the PNG files to the appropriate folders
5. Restart `npm run dev`

## ⚠️ License Notes

All recommended packs are **free** for personal and commercial use. Always check the individual asset pack licenses on itch.io for specific terms.

## 🎨 Current Status

- ❌ Backgrounds not loaded (using placeholder)
- ❌ Characters not loaded (using procedural sprites)
- ❌ Shops not loaded (using procedural graphics)

Once assets are added, the game will automatically detect and load them!
