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
    // Load parallax background layers
    this.load.image('bg-layer1', '/assets/backgrounds/layer1_base.png');
    this.load.image('bg-layer2', '/assets/backgrounds/layer2_buildings.png');
    this.load.image('bg-layer3', '/assets/backgrounds/layer3_midfog.png');
    this.load.image('bg-layer4', '/assets/backgrounds/layer4_fog.png');

    // Load character sprites
    this.load.image('player-idle', '/assets/characters/player_idle.png');
    this.load.image('merchant', '/assets/characters/merchant_idle.png');

    // Load shop building tileset
    this.load.image('buildings', '/assets/shops/buildings_tileset.png');
    this.load.image('props', '/assets/shops/props.png');
  }

  create(): void {
    const worldWidth = (this.SHOP_WIDTH + this.SHOP_SPACING) * this.SHOP_CONFIGS.length + 600;

    // Create background
    this.createBackground(worldWidth);

    // Create shops - clean and simple
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

  private createBackground(worldWidth: number): void {
    // Parallax background layers with different scroll speeds
    const bgWidth = 1280; // Central City asset width
    const numTiles = Math.ceil(worldWidth / bgWidth) + 2;

    // Layer 1: Base Color (slowest - 0.1x)
    for (let i = 0; i < numTiles; i++) {
      const layer1 = this.add.image(i * bgWidth, 300, 'bg-layer1');
      layer1.setOrigin(0, 0.5);
      layer1.setDisplaySize(bgWidth, 600);
      layer1.setDepth(-40);
      layer1.setScrollFactor(0.1);
    }

    // Layer 2: Buildings (0.3x)
    for (let i = 0; i < numTiles; i++) {
      const layer2 = this.add.image(i * bgWidth, 300, 'bg-layer2');
      layer2.setOrigin(0, 0.5);
      layer2.setDisplaySize(bgWidth, 600);
      layer2.setDepth(-30);
      layer2.setScrollFactor(0.3);
    }

    // Layer 3: Mid Fog (0.6x)
    for (let i = 0; i < numTiles; i++) {
      const layer3 = this.add.image(i * bgWidth, 300, 'bg-layer3');
      layer3.setOrigin(0, 0.5);
      layer3.setDisplaySize(bgWidth, 600);
      layer3.setDepth(-20);
      layer3.setScrollFactor(0.6);
    }

    // Layer 4: Frontal Fog (0.9x)
    for (let i = 0; i < numTiles; i++) {
      const layer4 = this.add.image(i * bgWidth, 300, 'bg-layer4');
      layer4.setOrigin(0, 0.5);
      layer4.setDisplaySize(bgWidth, 600);
      layer4.setDepth(-10);
      layer4.setScrollFactor(0.9);
    }

    // Ground overlay
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

    // Simple shop frame - clean, minimal
    const frame = this.add.rectangle(0, 0, config.width, config.height, 0x0d0221, 0.7);
    frame.setStrokeStyle(3, config.color, 0.9);
    container.add(frame);

    // Neon banner at top with shop name
    const banner = this.add.rectangle(0, -config.height / 2 + 30, config.width - 20, 60, 0x000000, 0.9);
    banner.setStrokeStyle(2, config.color, 1);
    container.add(banner);

    // Shop name text
    const label = this.add.text(0, -config.height / 2 + 30, config.label, {
      fontFamily: 'Orbitron',
      fontSize: '14px',
      color: '#ffffff',
      stroke: `#${config.color.toString(16).padStart(6, '0')}`,
      strokeThickness: 2,
    });
    label.setOrigin(0.5);
    container.add(label);

    // Neon glow effect around banner
    const glow = this.add.rectangle(0, -config.height / 2 + 30, config.width - 15, 65, config.color, 0.1);
    container.addAt(glow, 0);

    // Add simple merchant character at entrance
    this.createSimpleMerchant(container, config);

    // Make interactive
    frame.setInteractive({ useHandCursor: true });

    frame.on('pointerdown', () => {
      console.log(`Shop clicked: ${config.id} (${config.label})`);
      this.flashShop(container);
    });

    frame.on('pointerover', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 200,
        ease: 'Power2',
      });
      frame.setStrokeStyle(4, config.color, 1);
    });

    frame.on('pointerout', () => {
      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2',
      });
      frame.setStrokeStyle(3, config.color, 0.9);
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
