# Agent Explorer - Cyberpunk Hub

A fully immersive 2D side-scrolling cyberpunk agent hub built with Vite, React, TypeScript, and Phaser 3. Explore 5 unique crypto-themed shops with detailed interiors, NPCs, and interactive elements.

## ✨ Features

### 🎮 Player Character
- **Animated player character** with cyberpunk outfit and neon cyan visor
- **Idle breathing animation** for lifelike presence
- **Camera tracking** - character smoothly follows as you scroll through shops
- **Interactive tooltip** - "Click merchant to connect" hover indicator

### 🏪 5 Detailed Crypto-Themed Shops
Each shop features unique interiors with custom props, merchants, and speech bubbles:

#### 1. **YIELD OPTIMIZER** (Purple Glow)
- Glass vials with glowing liquids
- Golden coin displays with $ symbols
- Ethereum logo
- +125% APY percentage indicators
- Animated merchant NPC

#### 2. **OTC DESK** (Orange Glow)
- Live trading candlestick charts (red/green)
- Balance scales with golden pans
- Bitcoin logo
- BTC price ticker ($45.2K)
- Trading merchant with waving animation

#### 3. **BRIDGE OPERATOR** (Cyan Glow)
- Massive animated portal gateway with pulsing rings
- SOL branding in portal center
- Gateway pillars
- Continuous portal pulse animation
- No merchant (portal-only shop)

#### 4. **SWAP/DEX** (Pink Glow)
- Multi-level shelves with colorful potion bottles
- DAI and wUGC token logos
- 18+ glowing bottles in various colors
- Merchant bartender NPC
- Speech bubble: "Swap your assets?"

#### 5. **LENDING VAULT** (Blue Glow)
- Server racks with blinking status lights
- Data screens showing lending protocols
- LTC (Litecoin) logo
- APR: 8.5% | TVL: $45M display
- Robot NPC with pulsing antenna

### 🌆 Cyberpunk World Design
- **Cityscape background** with 15+ procedurally generated buildings
- **Neon-lit windows** with varying glow intensities
- **Ground-level perspective** with atmospheric depth
- **Speech bubbles** above each shop with merchant dialogue
- **Purple-to-black sky gradient** for moody atmosphere
- **Neon cyan ground line** separating shops from floor

### 💫 Interactive Elements
- **Smooth camera scrolling** with easing between shops
- **Hover effects** - shops scale to 103% and border glow intensifies
- **Click interactions** - flash effects and detailed console logging
- **Arrow-shaped navigation buttons** with cyan neon glow
- **Scroll hint indicator** with pulsing dots in bottom-right
- **Animated NPCs** - merchants wave, robots pulse, portals swirl

## 🛠 Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **React 18** - UI framework for overlay components
- **TypeScript** - Full type safety throughout
- **Phaser 3** - Powerful 2D game engine for canvas rendering
- **Tailwind CSS** - Utility-first styling for React UI
- **Orbitron Font** - Google Fonts cyberpunk typeface

## 🚀 Setup Instructions

1. **Add background image**:
   - Save the cyberpunk cityscape image as `public/background.jpg`
   - See `public/BACKGROUND_INSTRUCTIONS.md` for detailed instructions
   - The image should show the purple/pink neon cityscape with reflections

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
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
│   │   └── MainScene.ts     # Main scene (shops, player, background)
│   ├── config.ts           # Phaser configuration
│   └── types.ts            # TypeScript interfaces
├── App.tsx                 # Main React component
├── main.tsx                # Application entry point
└── index.css               # Tailwind imports & global styles
```

## 🎮 Controls

- **Left Arrow Button**: Scroll to previous shop
- **Right Arrow Button**: Scroll to next shop
- **Click Shop**: Interact with merchant (logs shop ID and name)
- **Hover Shop**: See scale animation and enhanced glow effects

## 🎨 Visual Design Philosophy

- **Pure Phaser Graphics** - All visual elements created using Phaser's built-in shapes/graphics API
- **No External Assets** - Everything rendered procedurally (no image files needed)
- **Neon Aesthetic** - Heavy use of glowing borders, transparent overlays, vibrant colors
- **Layered Depth** - Background cityscape → shops → foreground character → UI overlay
- **Smooth Animations** - Phaser tweens for breathing, pulsing, waving, portal effects
- **Crypto Theme** - Each shop represents real DeFi concepts (yield, OTC, bridging, swapping, lending)

## 🏗 Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 👀 Preview Production Build

```bash
npm run preview
```

## 🔮 Future Enhancement Ideas

- **Shop Interior Scenes** - Click to enter and explore detailed shop environments
- **Agent NFT System** - Create, customize, and trade AI agent NFTs
- **Inventory System** - Collect items, manage portfolios, track assets
- **Mini-Games** - Yield farming simulator, bridge timing game, swap matching
- **Sound Design** - Cyberpunk ambient music, neon hum, click sounds
- **Wallet Integration** - Connect real Web3 wallets for transactions
- **Multiplayer** - See other players exploring shops in real-time
- **Quest System** - Complete missions for each shop merchant
- **Mobile Support** - Touch controls for scrolling and interactions

## 📜 Technical Highlights

- **Phaser + React Integration** - Game canvas managed by Phaser, UI overlay by React
- **Type-Safe** - Full TypeScript coverage with interfaces for shops, events
- **Performant** - Single game instance, efficient container-based shop rendering
- **Modular** - Each shop interior is a separate method for easy expansion
- **Animated** - Idle animations, portal effects, blinking lights, breathing character
- **Responsive** - Camera pans smoothly, fits to container dimensions

---

**Built with ❤️ using Vite + React + TypeScript + Phaser 3**

🎮 Ready to explore the cyberpunk agent hub? Run `npm run dev` and start scrolling! 🚀
