import Phaser from 'phaser';
import { Shop } from '../types';

export default class MainScene extends Phaser.Scene {
  private shops: Map<string, Phaser.GameObjects.Container> = new Map();
  private player!: Phaser.GameObjects.Container;
  private playerTooltip!: Phaser.GameObjects.Container;

  private readonly SHOP_WIDTH = 240;
  private readonly SHOP_HEIGHT = 280;
  private readonly SHOP_SPACING = 150;
  private readonly GROUND_Y = 420;

  private readonly SHOP_CONFIGS: Shop[] = [
    {
      id: 'shop-1',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xbf00ff,
      label: 'YIELD OPTIMIZER',
      type: 'yield',
    },
    {
      id: 'shop-2',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xff9900,
      label: 'OTC DESK',
      type: 'otc',
    },
    {
      id: 'shop-3',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0x00ffff,
      label: 'BRIDGE OPERATOR',
      type: 'bridge',
    },
    {
      id: 'shop-4',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0xff00ff,
      label: 'SWAP/DEX',
      type: 'swap',
    },
    {
      id: 'shop-5',
      x: 0, y: 0,
      width: 240, height: 280,
      color: 0x0080ff,
      label: 'LENDING VAULT',
      type: 'lending',
    },
  ];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    // Load main background (the beautiful purple cityscape)
    this.load.image('cyberpunk-bg', '/background.png');

    // Load character sprites
    this.load.image('player-idle', '/assets/characters/player_idle.png');
    this.load.image('merchant', '/assets/characters/merchant_idle.png');

    // Load all 100 tiles for building shops
    for (let i = 1; i <= 100; i++) {
      this.load.image(`tile-${i}`, `/assets/cyberpunk-market-street-pixel-art/1 Tiles/Tile_${i.toString().padStart(2, '0')}.png`);
    }

    // Load 6 terrace objects (shop entrances)
    for (let i = 1; i <= 6; i++) {
      this.load.image(`terrace-${i}`, `/assets/cyberpunk-market-street-pixel-art/3 Objects/Terrace/${i}.png`);
    }

    // Load signboards (12 types)
    for (let i = 1; i <= 12; i++) {
      this.load.image(`signboard-${i}`, `/assets/props/signboards/${i}.png`);
    }

    // Load lamps (3 types)
    for (let i = 1; i <= 3; i++) {
      this.load.image(`lamp-${i}`, `/assets/props/lamps/${i}.png`);
    }

    // Load vending machines (7 types)
    for (let i = 1; i <= 7; i++) {
      this.load.image(`vending-${i}`, `/assets/props/vending/${i}.png`);
    }

    // Load animated objects
    this.load.image('money', '/assets/props/animated/Money.png');
    this.load.image('card', '/assets/props/animated/Card.png');
  }

  create(): void {
    const worldWidth = (this.SHOP_WIDTH + this.SHOP_SPACING) * this.SHOP_CONFIGS.length + 600;

    // Create background
    this.createBackground(worldWidth);

    // Create tile-based ground
    this.createTileGround(worldWidth);

    // Create shops - tile-based architecture
    this.SHOP_CONFIGS.forEach((config, index) => {
      const xPos = 300 + index * (this.SHOP_WIDTH + this.SHOP_SPACING) + this.SHOP_WIDTH / 2;
      const yPos = this.GROUND_Y - this.SHOP_HEIGHT / 2 - 53;
      this.createShop({ ...config, x: xPos, y: yPos });
    });

    // Create player
    this.createPlayer();

    // Set camera
    this.cameras.main.setBounds(0, 0, worldWidth, 600);
    this.cameras.main.scrollX = 0;
  }

  update(): void {
    // Player follows camera smoothly
    const targetPlayerX = this.cameras.main.scrollX + 600;
    this.player.x += (targetPlayerX - this.player.x) * 0.1;

    // Update tooltip position
    if (this.playerTooltip) {
      this.playerTooltip.x = this.player.x;
    }
  }

  private createTileGround(worldWidth: number): void {
    // Create brick ground using tiles 1-20 (ground/pavement tiles)
    const tileSize = 16; // Assume 16x16 tiles
    const groundTiles = [1, 2, 3, 4, 5, 6, 7, 8]; // Variety of ground tiles

    const startY = this.GROUND_Y;
    const numRows = 3; // Build 3 rows of ground tiles

    for (let row = 0; row < numRows; row++) {
      for (let x = 0; x < worldWidth; x += tileSize) {
        const tileIndex = groundTiles[Math.floor(Math.random() * groundTiles.length)];
        const tile = this.add.image(x, startY + row * tileSize, `tile-${tileIndex}`);
        tile.setOrigin(0, 0);
        tile.setDepth(-2);
      }
    }
  }

  private buildShopWall(
    container: Phaser.GameObjects.Container,
    tileIndices: number[],
    width: number,
    height: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): void {
    const tileSize = 16;
    const tilesWide = Math.floor(width / tileSize);
    const tilesHigh = Math.floor(height / tileSize);

    for (let row = 0; row < tilesHigh; row++) {
      for (let col = 0; col < tilesWide; col++) {
        let tileIndex: number;

        // Select tile based on position
        if (row === 0) {
          // Top row - roof/top tiles
          tileIndex = tileIndices[0];
        } else if (row === tilesHigh - 1) {
          // Bottom row - base tiles
          tileIndex = tileIndices[2];
        } else if (col === 0 || col === tilesWide - 1) {
          // Side columns - edge tiles
          tileIndex = tileIndices[1];
        } else {
          // Middle section - use variety from tile array
          tileIndex = tileIndices[Math.floor(Math.random() * tileIndices.length)];
        }

        const x = offsetX + col * tileSize - width / 2;
        const y = offsetY + row * tileSize - height / 2;

        const tile = this.add.image(x, y, `tile-${tileIndex}`);
        tile.setOrigin(0, 0);
        container.add(tile);
      }
    }
  }

  private createBackground(worldWidth: number): void {
    // Use the original high-quality purple cityscape
    const bgWidth = 1920;
    const numTiles = Math.ceil(worldWidth / bgWidth) + 1;

    for (let i = 0; i < numTiles; i++) {
      const bg = this.add.image(i * bgWidth, 300, 'cyberpunk-bg');
      bg.setOrigin(0, 0.5);
      bg.setDisplaySize(bgWidth, 600);
      bg.setDepth(-10);
    }

    // Subtle ground overlay
    const groundOverlay = this.add.rectangle(worldWidth / 2, this.GROUND_Y + 90, worldWidth, 180, 0x000000, 0.2);
    groundOverlay.setDepth(-5);
  }

  private createPlayer(): void {
    const startX = 600;
    const startY = this.GROUND_Y + 40;

    this.player = this.add.container(startX, startY);

    // Check if sprite loaded, otherwise use simple graphic
    if (this.textures.exists('player-idle')) {
      const playerSprite = this.add.image(0, 0, 'player-idle');
      playerSprite.setScale(2); // Scale up pixel art
      this.player.add(playerSprite);
    } else {
      // Simple fallback character
      const body = this.add.rectangle(0, 0, 30, 50, 0x2a2a2a);
      const head = this.add.circle(0, -35, 15, 0xd4a373);
      const jacket = this.add.rectangle(0, 5, 35, 30, 0x1a1a2e);
      jacket.setStrokeStyle(2, 0x00ffff, 0.8);
      const visor = this.add.rectangle(0, -35, 18, 4, 0x00ffff, 0.9);

      this.player.add([body, head, jacket, visor]);
    }

    // Idle breathing animation
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

    const tooltipBg = this.add.rectangle(0, 0, 180, 30, 0x0a0a0a, 0.9);
    tooltipBg.setStrokeStyle(2, 0x00ffff, 0.8);
    this.playerTooltip.add(tooltipBg);

    const tooltipText = this.add.text(0, 0, 'Click shop to explore', {
      fontFamily: 'Orbitron',
      fontSize: '11px',
      color: '#00ffff',
    });
    tooltipText.setOrigin(0.5);
    this.playerTooltip.add(tooltipText);

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

    // Define tile patterns for each shop type
    let tileIndices: number[];
    let terraceType: number;
    let signboardType: number;

    switch (config.type) {
      case 'yield':
        tileIndices = [20, 21, 22, 23, 24, 25]; // Purple/blue theme
        terraceType = 1;
        signboardType = 1;
        break;
      case 'otc':
        tileIndices = [40, 41, 42, 43, 44, 45]; // Orange/red theme
        terraceType = 2;
        signboardType = 3;
        break;
      case 'bridge':
        tileIndices = [60, 61, 62, 63, 64, 65]; // Cyan/tech theme
        terraceType = 3;
        signboardType = 5;
        break;
      case 'swap':
        tileIndices = [80, 81, 82, 83, 84, 85]; // Pink/purple theme
        terraceType = 4;
        signboardType = 7;
        break;
      case 'lending':
        tileIndices = [10, 11, 12, 13, 14, 15]; // Dark blue/secure theme
        terraceType = 5;
        signboardType = 9;
        break;
      default:
        tileIndices = [30, 31, 32, 33, 34, 35];
        terraceType = 6;
        signboardType = 1;
    }

    // Build shop walls using tiles
    this.buildShopWall(container, tileIndices, config.width, config.height);

    // Add terrace entrance at ground level
    if (this.textures.exists(`terrace-${terraceType}`)) {
      const terrace = this.add.image(0, config.height / 2 - 20, `terrace-${terraceType}`);
      terrace.setScale(1.5);
      container.add(terrace);
    }

    // Add signboard sprite as banner
    if (this.textures.exists(`signboard-${signboardType}`)) {
      const signboard = this.add.image(0, -config.height / 2 - 40, `signboard-${signboardType}`);
      signboard.setScale(1);
      container.add(signboard);
    }

    // Add simple merchant character at entrance
    this.createSimpleMerchant(container, config);

    // Add decorations based on shop type
    this.addShopDecorations(container, config);

    // Create invisible interactive hitbox
    const hitbox = this.add.rectangle(0, 0, config.width, config.height, 0xffffff, 0);
    hitbox.setInteractive({ useHandCursor: true });
    container.add(hitbox);

    hitbox.on('pointerdown', () => {
      console.log(`Shop clicked: ${config.id} (${config.label})`);
      this.flashShop(container);
    });

    hitbox.on('pointerover', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 200,
        ease: 'Power2',
      });
    });

    hitbox.on('pointerout', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2',
      });
    });

    this.shops.set(config.id, container);
  }

  private createSimpleMerchant(container: Phaser.GameObjects.Container, config: Shop): void {
    const merchantX = 0;
    const merchantY = 60;

    // Check if sprite loaded
    if (this.textures.exists('merchant')) {
      const merchantSprite = this.add.image(merchantX, merchantY, 'merchant');
      merchantSprite.setScale(1.5);
      container.add(merchantSprite);
    } else {
      // Simple fallback - just a silhouette figure
      const body = this.add.rectangle(merchantX, merchantY, 25, 45, 0x2a2a2a);
      const head = this.add.circle(merchantX, merchantY - 30, 12, 0xd4a373);
      const coat = this.add.rectangle(merchantX, merchantY + 5, 30, 28, 0x1a1a3a);
      coat.setStrokeStyle(1, config.color, 0.7);

      container.add([body, head, coat]);

      // Subtle wave animation
      this.tweens.add({
        targets: coat,
        angle: 3,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  private flashShop(container: Phaser.GameObjects.Container): void {
    this.tweens.add({
      targets: container,
      alpha: 0.7,
      duration: 100,
      yoyo: true,
      repeat: 1,
    });
  }

  private addShopDecorations(container: Phaser.GameObjects.Container, config: Shop): void {
    // Add decorations based on shop type
    switch (config.type) {
      case 'yield':
        // Signboard 1 (yield/percentage theme)
        const yieldSign = this.add.image(0, -config.height / 2 - 40, 'signboard-1');
        yieldSign.setScale(0.8);
        container.add(yieldSign);

        // Lamps on sides
        const yieldLampL = this.add.image(-config.width / 2 - 15, -config.height / 2 + 60, 'lamp-1');
        yieldLampL.setScale(0.7);
        container.add(yieldLampL);

        const yieldLampR = this.add.image(config.width / 2 + 15, -config.height / 2 + 60, 'lamp-1');
        yieldLampR.setScale(0.7);
        yieldLampR.setFlipX(true);
        container.add(yieldLampR);

        // Animated money
        const money1 = this.add.image(config.width / 2 - 30, -80, 'money');
        money1.setScale(0.6);
        container.add(money1);
        this.tweens.add({
          targets: money1,
          y: -90,
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        break;

      case 'otc':
        // Signboard 3 (trading theme)
        const otcSign = this.add.image(0, -config.height / 2 - 40, 'signboard-3');
        otcSign.setScale(0.8);
        container.add(otcSign);

        // Vending machine (ticket machine)
        const otcVending = this.add.image(config.width / 2 + 35, 40, 'vending-2');
        otcVending.setScale(0.9);
        container.add(otcVending);

        // Animated card
        const card1 = this.add.image(-config.width / 2 + 30, -60, 'card');
        card1.setScale(0.5);
        container.add(card1);
        this.tweens.add({
          targets: card1,
          angle: 10,
          y: -65,
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        break;

      case 'bridge':
        // Large signboard (portal theme)
        const bridgeSign = this.add.image(0, -config.height / 2 - 45, 'signboard-5');
        bridgeSign.setScale(1);
        container.add(bridgeSign);

        // Double lamps
        const bridgeLampL = this.add.image(-config.width / 2 - 18, -config.height / 2 + 40, 'lamp-2');
        bridgeLampL.setScale(0.75);
        container.add(bridgeLampL);

        const bridgeLampR = this.add.image(config.width / 2 + 18, -config.height / 2 + 40, 'lamp-2');
        bridgeLampR.setScale(0.75);
        bridgeLampR.setFlipX(true);
        container.add(bridgeLampR);
        break;

      case 'swap':
        // Signboard 7 (market theme)
        const swapSign = this.add.image(0, -config.height / 2 - 40, 'signboard-7');
        swapSign.setScale(0.8);
        container.add(swapSign);

        // Vending machine (item dispenser)
        const swapVending = this.add.image(-config.width / 2 - 35, 50, 'vending-4');
        swapVending.setScale(0.85);
        container.add(swapVending);

        // Animated money
        const money2 = this.add.image(config.width / 2 - 40, -70, 'money');
        money2.setScale(0.5);
        container.add(money2);
        this.tweens.add({
          targets: money2,
          y: -75,
          angle: -5,
          duration: 1800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        break;

      case 'lending':
        // Signboard 9 (vault/bank theme)
        const lendingSign = this.add.image(0, -config.height / 2 - 40, 'signboard-9');
        lendingSign.setScale(0.8);
        container.add(lendingSign);

        // Security lamp
        const lendingLamp = this.add.image(config.width / 2 + 15, -config.height / 2 + 50, 'lamp-3');
        lendingLamp.setScale(0.7);
        container.add(lendingLamp);

        // Vending machine (ATM style)
        const lendingVending = this.add.image(config.width / 2 + 38, 45, 'vending-6');
        lendingVending.setScale(0.9);
        container.add(lendingVending);

        // Animated card
        const card2 = this.add.image(-config.width / 2 + 35, -70, 'card');
        card2.setScale(0.5);
        container.add(card2);
        this.tweens.add({
          targets: card2,
          y: -75,
          angle: 5,
          duration: 1600,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        break;
    }
  }

  public scrollLeft(): void {
    const shopDistance = this.SHOP_WIDTH + this.SHOP_SPACING;
    const currentIndex = Math.round((this.cameras.main.scrollX - 300) / shopDistance);
    const newIndex = Math.max(0, currentIndex - 1);
    const targetX = 300 + newIndex * shopDistance;

    this.cameras.main.pan(targetX + 480, 300, 600, 'Power2');
  }

  public scrollRight(): void {
    const shopDistance = this.SHOP_WIDTH + this.SHOP_SPACING;
    const currentIndex = Math.round((this.cameras.main.scrollX - 300) / shopDistance);
    const maxIndex = this.SHOP_CONFIGS.length - 1;
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    const targetX = 300 + newIndex * shopDistance;

    this.cameras.main.pan(targetX + 480, 300, 600, 'Power2');
  }
}
