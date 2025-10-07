import Phaser from 'phaser';
import { Shop } from '../types';

export default class MainScene extends Phaser.Scene {
  private shops: Map<string, Phaser.GameObjects.Container> = new Map();
  private player!: Phaser.GameObjects.Container;
  private playerTooltip!: Phaser.GameObjects.Container;
  private backgroundImage!: Phaser.GameObjects.Image;
  private targetCameraX: number = 0;

  private readonly SHOP_WIDTH = 240;
  private readonly SHOP_HEIGHT = 280;
  private readonly SHOP_SPACING = 120;
  private readonly GROUND_Y = 420;

  private readonly SHOP_CONFIGS: Shop[] = [
    {
      id: 'shop-1',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xbf00ff,
      label: 'YIELD OPTIMIZER',
      type: 'yield',
      speechBubble: 'Optimize\nyield?'
    },
    {
      id: 'shop-2',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xff9900,
      label: 'OTC DESK',
      type: 'otc',
      speechBubble: 'Trade OTC?\nBest rates'
    },
    {
      id: 'shop-3',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0x00ffff,
      label: 'BRIDGE OPERATOR',
      type: 'bridge',
      speechBubble: 'Bridge\nchains?'
    },
    {
      id: 'shop-4',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xff00ff,
      label: 'SWAP/DEX',
      type: 'swap',
      speechBubble: 'Swap your\nassets?'
    },
    {
      id: 'shop-5',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0x0080ff,
      label: 'LENDING VAULT',
      type: 'lending',
      speechBubble: 'Lend/Borrow\nagents?'
    },
  ];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    // Load the cyberpunk cityscape background
    this.load.image('cyberpunk-bg', '/background.jpg');
  }

  create(): void {
    const worldWidth = (this.SHOP_WIDTH + this.SHOP_SPACING) * this.SHOP_CONFIGS.length + 400;

    // Create background image
    this.createBackground(worldWidth);

    // Create shops
    this.SHOP_CONFIGS.forEach((config, index) => {
      const xPos = 200 + index * (this.SHOP_WIDTH + this.SHOP_SPACING) + this.SHOP_WIDTH / 2;
      const yPos = this.GROUND_Y - this.SHOP_HEIGHT / 2;
      this.createShop({ ...config, x: xPos, y: yPos });
    });

    // Create player
    this.createPlayer();

    // Set camera
    this.cameras.main.setBounds(0, 0, worldWidth, 600);
    this.cameras.main.scrollX = 0;
  }

  update(): void {
    // Player follows camera with slight offset
    const targetPlayerX = this.cameras.main.scrollX + 600;
    this.player.x += (targetPlayerX - this.player.x) * 0.1;

    // Update tooltip position
    if (this.playerTooltip) {
      this.playerTooltip.x = this.player.x;
    }
  }

  private createBackground(worldWidth: number): void {
    // Create tiled background - repeat the image across the world width
    const bgWidth = 1920; // Estimate of image width, adjust as needed
    const numTiles = Math.ceil(worldWidth / bgWidth) + 1;

    for (let i = 0; i < numTiles; i++) {
      const bg = this.add.image(i * bgWidth, 300, 'cyberpunk-bg');
      bg.setOrigin(0, 0.5);
      bg.setDisplaySize(bgWidth, 600);
      bg.setDepth(-10);
    }

    // Optional: Add a subtle ground overlay to darken the lower portion
    const groundOverlay = this.add.rectangle(worldWidth / 2, this.GROUND_Y + 90, worldWidth, 180, 0x000000, 0.3);
    groundOverlay.setDepth(-5);
  }

  private createPlayer(): void {
    const startX = 600;
    const startY = this.GROUND_Y - 40;

    this.player = this.add.container(startX, startY);

    // Body
    const body = this.add.rectangle(0, 0, 30, 50, 0x2a2a2a);
    this.player.add(body);

    // Head
    const head = this.add.circle(0, -35, 15, 0xd4a373);
    this.player.add(head);

    // Cyberpunk jacket with neon trim
    const jacket = this.add.rectangle(0, 5, 35, 30, 0x1a1a2e);
    this.player.add(jacket);
    const jacketGlow = this.add.rectangle(0, 5, 35, 30);
    jacketGlow.setStrokeStyle(2, 0x00ffff, 0.8);
    this.player.add(jacketGlow);

    // Arms
    const leftArm = this.add.rectangle(-15, 0, 8, 35, 0x1a1a2e);
    const rightArm = this.add.rectangle(15, 0, 8, 35, 0x1a1a2e);
    this.player.add(leftArm);
    this.player.add(rightArm);

    // Legs
    const leftLeg = this.add.rectangle(-8, 30, 10, 30, 0x0a0a1a);
    const rightLeg = this.add.rectangle(8, 30, 10, 30, 0x0a0a1a);
    this.player.add(leftLeg);
    this.player.add(rightLeg);

    // Visor/eyes (cyan glow)
    const visor = this.add.rectangle(0, -35, 18, 4, 0x00ffff, 0.9);
    this.player.add(visor);

    // Add idle breathing animation
    this.tweens.add({
      targets: this.player,
      y: startY - 3,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Create tooltip
    this.createPlayerTooltip(startX, startY);

    this.player.setDepth(100);
  }

  private createPlayerTooltip(x: number, y: number): void {
    this.playerTooltip = this.add.container(x, y - 80);

    const tooltipBg = this.add.rectangle(0, 0, 200, 35, 0x0a0a0a, 0.9);
    tooltipBg.setStrokeStyle(2, 0x00ffff, 0.8);
    this.playerTooltip.add(tooltipBg);

    const tooltipText = this.add.text(0, 0, 'Click merchant to connect', {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      color: '#00ffff',
    });
    tooltipText.setOrigin(0.5);
    this.playerTooltip.add(tooltipText);

    // Pointer arrow
    const arrow = this.add.triangle(0, 20, 0, -8, -8, 8, 8, 8, 0x00ffff, 0.8);
    this.playerTooltip.add(arrow);

    // Pulse animation
    this.tweens.add({
      targets: this.playerTooltip,
      alpha: 0.7,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.playerTooltip.setDepth(101);
  }

  private createShop(config: Shop): void {
    const container = this.add.container(config.x, config.y);

    // Shop frame/border
    const frame = this.add.rectangle(0, 0, config.width, config.height, 0x1a0a2e);
    frame.setStrokeStyle(4, config.color, 0.9);
    container.add(frame);

    // Inner dark background
    const innerBg = this.add.rectangle(0, 0, config.width - 10, config.height - 10, 0x0d0221);
    container.add(innerBg);

    // Top sign bar
    const signBar = this.add.rectangle(0, -config.height / 2 + 25, config.width - 10, 50, 0x0a0a0a);
    signBar.setStrokeStyle(2, config.color, 0.7);
    container.add(signBar);

    const label = this.add.text(0, -config.height / 2 + 25, config.label, {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      color: '#ffffff',
      stroke: `#${config.color.toString(16).padStart(6, '0')}`,
      strokeThickness: 1.5,
    });
    label.setOrigin(0.5);
    container.add(label);

    // Add shop-specific interior based on type
    switch (config.type) {
      case 'yield':
        this.createYieldOptimizerInterior(container, config);
        break;
      case 'otc':
        this.createOTCDeskInterior(container, config);
        break;
      case 'bridge':
        this.createBridgeOperatorInterior(container, config);
        break;
      case 'swap':
        this.createSwapDEXInterior(container, config);
        break;
      case 'lending':
        this.createLendingVaultInterior(container, config);
        break;
    }

    // Add merchant NPC (except for bridge which has a portal)
    if (config.type !== 'bridge') {
      this.createMerchant(container, config);
    }

    // Speech bubble
    if (config.speechBubble) {
      this.createSpeechBubble(container, config.speechBubble, config.color);
    }

    // Make interactive
    frame.setInteractive({ useHandCursor: true });

    frame.on('pointerdown', () => {
      console.log(`Shop clicked: ${config.id} (${config.label})`);
      this.flashShop(container, config.color);
    });

    frame.on('pointerover', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 200,
        ease: 'Power2',
      });
      frame.setStrokeStyle(6, config.color, 1);
    });

    frame.on('pointerout', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2',
      });
      frame.setStrokeStyle(4, config.color, 0.9);
    });

    this.shops.set(config.id, container);
  }

  private createYieldOptimizerInterior(container: Phaser.GameObjects.Container, config: Shop): void {
    // Counter (scaled down)
    const counter = this.add.rectangle(0, 70, 200, 60, 0x2a1a4a);
    counter.setStrokeStyle(2, config.color, 0.6);
    container.add(counter);

    // Glass vials on counter (scaled down)
    const vialPositions = [-60, -30, 0, 30, 60];
    vialPositions.forEach((x, i) => {
      const vial = this.add.rectangle(x, 55, 14, 25, 0x4a2a6a, 0.7);
      vial.setStrokeStyle(1.5, 0x00ffff, 0.8);
      container.add(vial);

      const liquid = this.add.rectangle(x, 62, 11, Phaser.Math.Between(8, 18), config.color, 0.6);
      container.add(liquid);

      const glow = this.add.circle(x, 62, 9, config.color, 0.2);
      container.add(glow);
    });

    // Coin displays (scaled down)
    for (let i = 0; i < 3; i++) {
      const coinX = -65 + i * 65;
      const coin = this.add.circle(coinX, -25, 18, 0xffd700, 0.8);
      coin.setStrokeStyle(2, 0xffaa00, 1);
      container.add(coin);

      const symbol = this.add.text(coinX, -25, '$', {
        fontFamily: 'Orbitron',
        fontSize: '18px',
        color: '#000000',
        fontStyle: 'bold'
      });
      symbol.setOrigin(0.5);
      container.add(symbol);
    }

    // Ethereum logo (scaled down)
    const ethLogo = this.createEthereumLogo(85, -40, 22);
    container.add(ethLogo);

    // Percentage displays (scaled down)
    const percentText = this.add.text(-85, -65, '+125%\nAPY', {
      fontFamily: 'Orbitron',
      fontSize: '11px',
      color: '#00ff00',
      align: 'center'
    });
    percentText.setOrigin(0.5);
    container.add(percentText);
  }

  private createOTCDeskInterior(container: Phaser.GameObjects.Container, config: Shop): void {
    // Counter
    const counter = this.add.rectangle(0, 80, 280, 80, 0x2a1a1a);
    counter.setStrokeStyle(2, config.color, 0.6);
    container.add(counter);

    // Trading chart on wall
    const chartBg = this.add.rectangle(-70, -20, 100, 80, 0x1a1a1a, 0.8);
    chartBg.setStrokeStyle(2, 0x00ffff, 0.6);
    container.add(chartBg);

    // Chart lines (candlesticks)
    const chartPoints = [-90, -85, -80, -75, -70, -65, -60, -55, -50];
    chartPoints.forEach((x) => {
      const height = Phaser.Math.Between(15, 40);
      const candlestick = this.add.rectangle(x, -20, 4, height, Phaser.Math.RND.pick([0x00ff00, 0xff0000]), 0.9);
      container.add(candlestick);
    });

    // Balance scales
    const scaleBase = this.add.rectangle(70, -20, 60, 5, 0xcccccc);
    container.add(scaleBase);

    const leftPan = this.add.circle(45, -10, 15, 0xffd700, 0.7);
    leftPan.setStrokeStyle(2, 0xffaa00);
    container.add(leftPan);

    const rightPan = this.add.circle(95, -10, 15, 0xffd700, 0.7);
    rightPan.setStrokeStyle(2, 0xffaa00);
    container.add(rightPan);

    // Bitcoin logo
    const btcLogo = this.createBitcoinLogo(120, 50, 35);
    container.add(btcLogo);

    // Price ticker
    const ticker = this.add.text(-120, -80, 'BTC\n$45.2K', {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      color: config.color.toString(16),
      align: 'center'
    });
    ticker.setOrigin(0.5);
    container.add(ticker);
  }

  private createBridgeOperatorInterior(container: Phaser.GameObjects.Container, config: Shop): void {
    // Large portal/gateway
    const portalOuter = this.add.ellipse(0, 20, 200, 240);
    portalOuter.setStrokeStyle(6, config.color, 0.9);
    container.add(portalOuter);

    // Inner portal glow rings
    for (let i = 0; i < 4; i++) {
      const ring = this.add.ellipse(0, 20, 180 - i * 30, 220 - i * 40, config.color, 0.1 + i * 0.05);
      container.add(ring);
    }

    // Portal center with animated particles
    const portalCenter = this.add.circle(0, 20, 60, config.color, 0.3);
    container.add(portalCenter);

    // SOL branding in portal
    const solText = this.add.text(0, 20, 'SOL', {
      fontFamily: 'Orbitron',
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    solText.setOrigin(0.5);
    solText.setAlpha(0.8);
    container.add(solText);

    // Portal animation
    this.tweens.add({
      targets: [portalOuter, ...portalOuter.parentContainer?.list.filter(obj => obj instanceof Phaser.GameObjects.Ellipse && obj !== portalOuter) || []],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Gateway pillars
    const leftPillar = this.add.rectangle(-120, 20, 20, 220, 0x1a4a5a);
    leftPillar.setStrokeStyle(3, config.color, 0.7);
    container.add(leftPillar);

    const rightPillar = this.add.rectangle(120, 20, 20, 220, 0x1a4a5a);
    rightPillar.setStrokeStyle(3, config.color, 0.7);
    container.add(rightPillar);
  }

  private createSwapDEXInterior(container: Phaser.GameObjects.Container, config: Shop): void {
    // Counter
    const counter = this.add.rectangle(0, 80, 280, 80, 0x2a1a2a);
    counter.setStrokeStyle(2, config.color, 0.6);
    container.add(counter);

    // Shelves with colorful potion bottles
    const shelfY = [-60, -20, 20];
    const bottleColors = [0xff00ff, 0x00ffff, 0xff0080, 0x00ff80, 0xffff00, 0xff8000, 0x8000ff];

    shelfY.forEach((y) => {
      // Shelf
      const shelf = this.add.rectangle(0, y, 260, 5, 0x3a3a3a);
      container.add(shelf);

      // Bottles on shelf
      for (let i = 0; i < 6; i++) {
        const bottleX = -120 + i * 45;
        const bottleColor = Phaser.Math.RND.pick(bottleColors);

        // Bottle body
        const bottle = this.add.rectangle(bottleX, y - 15, 12, 25, bottleColor, 0.7);
        bottle.setStrokeStyle(1, bottleColor, 1);
        container.add(bottle);

        // Bottle cap
        const cap = this.add.rectangle(bottleX, y - 28, 8, 5, 0x1a1a1a);
        container.add(cap);

        // Glow
        const glow = this.add.circle(bottleX, y - 15, 10, bottleColor, 0.2);
        container.add(glow);
      }
    });

    // DAI logo
    const daiLogo = this.add.circle(-110, 60, 20, 0xffd700, 0.9);
    daiLogo.setStrokeStyle(2, 0xffaa00);
    const daiText = this.add.text(-110, 60, 'DAI', {
      fontFamily: 'Orbitron',
      fontSize: '10px',
      color: '#000000',
      fontStyle: 'bold'
    });
    daiText.setOrigin(0.5);
    container.add(daiLogo);
    container.add(daiText);

    // wUGC logo
    const ugcLogo = this.add.circle(110, 60, 20, 0xff00ff, 0.9);
    ugcLogo.setStrokeStyle(2, 0xbf00ff);
    const ugcText = this.add.text(110, 60, 'wUGC', {
      fontFamily: 'Orbitron',
      fontSize: '8px',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    ugcText.setOrigin(0.5);
    container.add(ugcLogo);
    container.add(ugcText);
  }

  private createLendingVaultInterior(container: Phaser.GameObjects.Container, config: Shop): void {
    // Server racks in background
    for (let i = 0; i < 3; i++) {
      const rackX = -80 + i * 80;
      const rack = this.add.rectangle(rackX, -30, 60, 150, 0x1a1a1a);
      rack.setStrokeStyle(2, config.color, 0.5);
      container.add(rack);

      // Server lights (blinking)
      for (let j = 0; j < 8; j++) {
        const lightY = -90 + j * 20;
        const light = this.add.circle(rackX - 15, lightY, 3, Phaser.Math.RND.pick([0x00ff00, 0x0080ff, 0xff0000]), 0.9);
        container.add(light);

        // Blink animation
        this.tweens.add({
          targets: light,
          alpha: 0.3,
          duration: Phaser.Math.Between(500, 1500),
          yoyo: true,
          repeat: -1,
        });
      }
    }

    // Data screens
    const screenBg = this.add.rectangle(0, 70, 200, 60, 0x0a0a1a);
    screenBg.setStrokeStyle(2, 0x00ffff, 0.7);
    container.add(screenBg);

    // Screen content (data visualization)
    const dataText = this.add.text(0, 70, '[ LENDING PROTOCOLS ACTIVE ]\n> APR: 8.5% | TVL: $45M', {
      fontFamily: 'Orbitron',
      fontSize: '9px',
      color: '#00ff00',
      align: 'center'
    });
    dataText.setOrigin(0.5);
    container.add(dataText);

    // LTC logo
    const ltcLogo = this.add.circle(120, -70, 25, 0x345d9d, 0.9);
    ltcLogo.setStrokeStyle(3, 0x5c8cd4);
    const ltcText = this.add.text(120, -70, 'LTC', {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    ltcText.setOrigin(0.5);
    container.add(ltcLogo);
    container.add(ltcText);

    // Add robot NPC instead of human merchant
    this.createRobotNPC(container, config);
  }

  private createMerchant(container: Phaser.GameObjects.Container, config: Shop): void {
    const merchantX = -80;
    const merchantY = 50;

    // Body
    const body = this.add.rectangle(merchantX, merchantY, 25, 40, 0x2a2a2a);
    container.add(body);

    // Head
    const head = this.add.circle(merchantX, merchantY - 30, 12, 0xd4a373);
    container.add(head);

    // Merchant coat
    const coat = this.add.rectangle(merchantX, merchantY + 5, 30, 25, 0x4a1a5a);
    coat.setStrokeStyle(1, config.color, 0.8);
    container.add(coat);

    // Arms
    const leftArm = this.add.rectangle(merchantX - 13, merchantY, 6, 28, 0x4a1a5a);
    const rightArm = this.add.rectangle(merchantX + 13, merchantY, 6, 28, 0x4a1a5a);
    container.add(leftArm);
    container.add(rightArm);

    // Eyes
    const leftEye = this.add.circle(merchantX - 4, merchantY - 30, 2, 0x00ffff);
    const rightEye = this.add.circle(merchantX + 4, merchantY - 30, 2, 0x00ffff);
    container.add(leftEye);
    container.add(rightEye);

    // Slight wave animation
    this.tweens.add({
      targets: rightArm,
      angle: 10,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createRobotNPC(container: Phaser.GameObjects.Container, config: Shop): void {
    const robotX = -80;
    const robotY = 50;

    // Robot body
    const body = this.add.rectangle(robotX, robotY, 28, 45, 0x4a4a5a);
    body.setStrokeStyle(2, config.color, 0.8);
    container.add(body);

    // Robot head
    const head = this.add.rectangle(robotX, robotY - 30, 24, 20, 0x3a3a4a);
    head.setStrokeStyle(2, config.color, 0.8);
    container.add(head);

    // Visor/eyes (glowing)
    const visor = this.add.rectangle(robotX, robotY - 30, 18, 4, config.color, 0.9);
    container.add(visor);

    // Antenna
    const antenna = this.add.rectangle(robotX, robotY - 45, 2, 10, config.color, 0.7);
    container.add(antenna);
    const antennaBulb = this.add.circle(robotX, robotY - 50, 4, config.color, 0.9);
    container.add(antennaBulb);

    // Arms
    const leftArm = this.add.rectangle(robotX - 16, robotY, 6, 30, 0x3a3a4a);
    leftArm.setStrokeStyle(1, config.color, 0.6);
    const rightArm = this.add.rectangle(robotX + 16, robotY, 6, 30, 0x3a3a4a);
    rightArm.setStrokeStyle(1, config.color, 0.6);
    container.add(leftArm);
    container.add(rightArm);

    // Antenna pulse
    this.tweens.add({
      targets: antennaBulb,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  private createSpeechBubble(container: Phaser.GameObjects.Container, text: string, color: number): void {
    const bubbleX = 60;
    const bubbleY = -110;

    // Bubble background (scaled down)
    const bubble = this.add.rectangle(bubbleX, bubbleY, 85, 42, 0x0a0a0a, 0.9);
    bubble.setStrokeStyle(1.5, color, 0.8);
    container.add(bubble);

    // Pointer (scaled down)
    const pointer = this.add.triangle(bubbleX - 25, bubbleY + 21, -5, -10, 5, -10, 0, 0, color, 0.8);
    container.add(pointer);

    // Text (scaled down)
    const bubbleText = this.add.text(bubbleX, bubbleY, text, {
      fontFamily: 'Orbitron',
      fontSize: '9px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 1.5
    });
    bubbleText.setOrigin(0.5);
    container.add(bubbleText);

    // Subtle pulse
    this.tweens.add({
      targets: bubble,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createEthereumLogo(x: number, y: number, size: number): Phaser.GameObjects.Container {
    const logo = this.add.container(x, y);

    const circle = this.add.circle(0, 0, size, 0x627eea, 0.9);
    circle.setStrokeStyle(2, 0x8a9af2);
    logo.add(circle);

    const diamond = this.add.polygon(0, -3, [0, -10, 8, 0, 0, 4], 0xffffff, 0.9);
    logo.add(diamond);

    const diamondBottom = this.add.polygon(0, 5, [0, -2, 8, -8, 0, 8], 0xcccccc, 0.7);
    logo.add(diamondBottom);

    return logo;
  }

  private createBitcoinLogo(x: number, y: number, size: number): Phaser.GameObjects.Container {
    const logo = this.add.container(x, y);

    const circle = this.add.circle(0, 0, size, 0xf7931a, 0.9);
    circle.setStrokeStyle(3, 0xffaa00);
    logo.add(circle);

    const bText = this.add.text(0, 0, '₿', {
      fontFamily: 'Orbitron',
      fontSize: `${size}px`,
      color: '#ffffff',
      fontStyle: 'bold'
    });
    bText.setOrigin(0.5);
    logo.add(bText);

    return logo;
  }

  private flashShop(container: Phaser.GameObjects.Container, color: number): void {
    this.tweens.add({
      targets: container,
      alpha: 0.7,
      duration: 100,
      yoyo: true,
      repeat: 1,
    });
  }

  public scrollLeft(): void {
    const shopDistance = this.SHOP_WIDTH + this.SHOP_SPACING;
    const currentIndex = Math.round((this.cameras.main.scrollX - 200) / shopDistance);
    const newIndex = Math.max(0, currentIndex - 1);
    const targetX = 200 + newIndex * shopDistance;

    this.cameras.main.pan(targetX + 480, 300, 600, 'Power2');
  }

  public scrollRight(): void {
    const shopDistance = this.SHOP_WIDTH + this.SHOP_SPACING;
    const currentIndex = Math.round((this.cameras.main.scrollX - 200) / shopDistance);
    const maxIndex = this.SHOP_CONFIGS.length - 1;
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    const targetX = 200 + newIndex * shopDistance;

    this.cameras.main.pan(targetX + 480, 300, 600, 'Power2');
  }
}
