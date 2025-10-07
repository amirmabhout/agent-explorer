# Agent Explorer - Cyberpunk Hub

A clean, professional 2D side-scrolling cyberpunk agent hub built with Vite, React, TypeScript, and Phaser 3. Explore 5 unique crypto-themed shops with pixel art assets.

## ✨ Features

### 🎮 Player Character
- **Animated player character** with smooth camera tracking
- **Idle breathing animation** for lifelike presence
- **Supports sprite loading** - Use your own pixel art or fallback to simple graphics
- **Interactive tooltip** - "Click shop to explore"

### 🏪 5 Clean Crypto-Themed Shops
Each shop features:
- **Simple, uncluttered design** - Clean neon banner with shop name
- **One merchant character** standing at the entrance
- **Neon color coding** - Purple, Orange, Cyan, Pink, Blue
- **Interactive** - Hover for glow effects, click to interact
- **Proper spacing** - 150px between shops for better visibility

**Shop List:**
1. **YIELD OPTIMIZER** (Purple) - Optimize yield farming strategies
2. **OTC DESK** (Orange) - Over-the-counter trading
3. **BRIDGE OPERATOR** (Cyan) - Cross-chain bridging
4. **SWAP/DEX** (Pink) - Decentralized exchange
5. **LENDING VAULT** (Blue) - Lending and borrowing protocols

### 🎨 Professional Asset System
- **Sprite-based rendering** - Supports professional pixel art assets
- **Fallback graphics** - Works without assets using simple placeholders
- **Easy asset integration** - Drop sprites in folders and they load automatically
- **Recommended free asset packs** from itch.io included

## 🛠 Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **React 18** - UI framework for overlay components
- **TypeScript** - Full type safety throughout
- **Phaser 3** - Powerful 2D game engine for canvas rendering
- **Tailwind CSS** - Utility-first styling for React UI
- **Orbitron Font** - Google Fonts cyberpunk typeface

## 🚀 Setup Instructions

### 1. **Add Background Image** (Required)
   - Save your cyberpunk cityscape image as `public/background.png`
   - Recommended size: 1920x1080 (will be scaled to fit)
   - The ground line should be roughly in the middle

### 2. **Add Asset Packs** (Optional but Recommended)
   - See `public/assets/ASSET_SETUP.md` for detailed instructions
   - Download free pixel art from the recommended itch.io packs
   - Extract and place in appropriate folders:
     - `public/assets/backgrounds/` - Background layers
     - `public/assets/characters/` - Player and merchant sprites
     - `public/assets/shops/` - Shop building tiles

**Top Recommended Packs** (All FREE):
- [FREE Sidescroller Shooter - Central City](https://anokolisa.itch.io/sidescroller-shooter-central-city) - Backgrounds
- [Cyberpunk Character Pack](https://oco.itch.io/cyberpunk-character-pack) - Characters
- [Retro Cybercity STREETS Tileset](https://everlyspixelsandpens.itch.io/retro-cybercity-streets-tileset) - Buildings
- [Synth Cities Environment](https://ansimuz.itch.io/synth-cities-environment) - Alternative backgrounds

### 3. **Install Dependencies**
   ```bash
   npm install
   ```

### 4. **Run Development Server**
   ```bash
   npm run dev
   ```

### 5. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - Use left/right arrow buttons to scroll between shops
   - Click on any shop to interact (check console)
   - Hover over shops to see glow effects
   - Watch the player character follow the camera

## 📁 Project Structure

```
src/
├── components/              # React UI components
│   ├── GameContainer.tsx    # Phaser game wrapper
│   └── UIOverlay.tsx        # Arrow buttons & scroll hint
├── game/                    # Phaser game code
│   ├── scenes/
│   │   └── MainScene.ts     # Main scene (simplified & clean)
│   ├── config.ts           # Phaser configuration
│   └── types.ts            # TypeScript interfaces
├── App.tsx                 # Main React component
├── main.tsx                # Application entry point
└── index.css               # Tailwind imports & global styles

public/
├── background.png          # Main background image (USER PROVIDED)
└── assets/                 # Optional pixel art assets
    ├── backgrounds/        # Parallax background layers
    ├── characters/         # Player and NPC sprites
    ├── shops/              # Shop building sprites
    └── ui/                 # UI elements
```

## 🎮 Controls

- **Left Arrow Button**: Scroll to previous shop
- **Right Arrow Button**: Scroll to next shop
- **Click Shop**: Interact with merchant (logs shop ID and name)
- **Hover Shop**: See scale animation and enhanced glow effects

## 🎨 Design Philosophy

### Current Version: Clean & Minimal
- **No clutter** - Removed all interior decorations (vials, charts, coins, etc.)
- **One character per shop** - Simple merchant at entrance
- **Clear branding** - Neon banner with shop name only
- **Professional assets** - Supports sprite-based rendering
- **Fallback graphics** - Works immediately without assets

### Asset Integration
- **Automatic detection** - If sprite exists, use it; otherwise use fallback
- **No breaking changes** - App works with or without asset packs
- **Easy upgrade path** - Drop assets in folders and refresh

## 🏗 Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 👀 Preview Production Build

```bash
npm run preview
```

## 📦 Asset Guidelines

### Character Sprites
- **Format**: PNG with transparency
- **Size**: 32x32 to 64x64 pixels (will be scaled)
- **Animations**: Idle, walk (optional)
- **Naming**: `player_idle.png`, `merchant_idle.png`

### Background
- **Format**: PNG or JPG
- **Size**: 1920x1080 or larger
- **Style**: Cyberpunk cityscape with ground line in middle

### Shop Buildings
- **Format**: PNG tileset
- **Size**: Modular tiles (16x16 or 32x32)
- **Style**: Cyberpunk storefronts

## 🔮 Future Enhancement Ideas

- **Animated sprites** - Walking, idle, interaction animations
- **Parallax backgrounds** - Multi-layer scrolling depth
- **Shop interiors** - Click to enter detailed shop scenes
- **Sound effects** - Ambient music and interaction sounds
- **More interactions** - Mini-games, trading, inventory
- **Mobile support** - Touch controls for scrolling

## 📜 Technical Highlights

- **Clean architecture** - Removed 600+ lines of cluttered code
- **Smart fallbacks** - Works without assets, improves with them
- **Type-safe** - Full TypeScript coverage
- **Performant** - Simplified rendering, better FPS
- **Modular** - Easy to extend and customize
- **Asset-ready** - Drop-in sprite support

## 🆓 Free Assets

All recommended asset packs are **completely free** for personal and commercial use. Check individual licenses on itch.io for specific terms.

---

**Built with ❤️ using Vite + React + TypeScript + Phaser 3**

🎮 Ready to explore? Follow the setup instructions and add your assets! 🚀

## 📝 Version History

### v2.0 - Clean Redesign
- Removed all procedural clutter
- Simplified shops to banner + merchant
- Added professional asset support
- Improved spacing (150px between shops)
- Better fallback graphics

### v1.0 - Initial Release
- Procedural graphics
- Complex shop interiors
- 5 themed shops with details
