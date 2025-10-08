import Phaser from 'phaser';
import { Shop } from '../types';

export interface Street {
  id: string;
  name: string;
}

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Container;
  private currentShopIndex: number = 2; // Start at middle shop (index 2)
  private shopPositions: number[] = [170, 360, 600, 840, 1030];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private swipeStartX: number = 0;
  private swipeThreshold: number = 50;
  private currentStreetIndex: number = 0;
  private backgroundMusic!: Phaser.Sound.BaseSound;

  private readonly STREETS: Street[] = [
    { id: 'generative-markets', name: 'Generative Markets Street' },
    { id: 'defi', name: 'DeFi Street' },
    { id: 'prediction-markets', name: 'Prediction Markets Street' },
    { id: 'socialfi', name: 'SocialFi Street' },
  ];

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
    // Load background with all 5 shops built-in
    this.load.image('shops-bg', '/assets/shops/shop.png');

    // Load character sprites
    this.load.image('player-idle', '/assets/characters/player_idle.png');

    // Load background music
    this.load.audio('bgMusic', '/assets/music/Industria.mp3');
  }

  create(): void {
    // Create static background
    this.createBackground();

    // Position shops to match background locations (5 evenly distributed) - responsive
    const { width, height } = this.scale.gameSize;
    const shopY = height * 0.47; // Approximately where shops are in the image

    // Calculate shop positions as percentages of screen width
    const shopXPositions = [0.14, 0.30, 0.50, 0.70, 0.86]; // Evenly distributed
    this.shopPositions = shopXPositions.map(percent => width * percent);

    this.SHOP_CONFIGS.forEach((config, index) => {
      const xPos = this.shopPositions[index];
      this.createShop({ ...config, x: xPos, y: shopY }, index);
    });

    // Create player
    this.createPlayer();

    // Handle resize for shops and player
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      this.handleResize(gameSize);
    });

    // Setup keyboard controls
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Setup swipe/drag controls
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.swipeStartX = pointer.x;
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      const swipeDistance = pointer.x - this.swipeStartX;

      if (Math.abs(swipeDistance) > this.swipeThreshold) {
        if (swipeDistance > 0) {
          // Swipe right - move left
          this.scrollLeft();
        } else {
          // Swipe left - move right
          this.scrollRight();
        }
      }
    });

    // Setup background music
    try {
      this.backgroundMusic = this.sound.add('bgMusic', {
        loop: true,
        volume: 0.3, // 30% volume for ambient background
      });
      this.backgroundMusic.play();
    } catch (error) {
      console.warn('Failed to load background music:', error);
    }
  }

  update(): void {
    // Handle keyboard input with debouncing
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
      this.scrollLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
      this.scrollRight();
    }
  }

  private createBackground(): void {
    // Display static background with all 5 shops - responsive scaling
    const bg = this.add.image(0, 0, 'shops-bg');
    bg.setOrigin(0.5, 0.5);
    bg.setDepth(-10);

    // Handle window resize to keep background responsive
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      const width = gameSize.width;
      const height = gameSize.height;

      // Center the background
      bg.setPosition(width / 2, height / 2);

      // Scale background to cover the entire screen while maintaining aspect ratio
      const scaleX = width / bg.width;
      const scaleY = height / bg.height;
      const scale = Math.max(scaleX, scaleY);
      bg.setScale(scale);
    });

    // Trigger initial resize
    const { width, height } = this.scale.gameSize;
    bg.setPosition(width / 2, height / 2);
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
  }

  private createPlayer(): void {
    const { height } = this.scale.gameSize;
    const startX = this.shopPositions[2]; // Start at middle shop
    const startY = height * 0.80; // Ground level (80% down the screen)

    this.player = this.add.container(startX, startY);

    // Check if sprite loaded, otherwise use simple graphic
    if (this.textures.exists('player-idle')) {
      const playerSprite = this.add.image(0, 0, 'player-idle');
      playerSprite.setScale(1); // Smaller scale
      this.player.add(playerSprite);
    } else {
      // Simple fallback character (smaller)
      const body = this.add.rectangle(0, 0, 20, 35, 0x2a2a2a);
      const head = this.add.circle(0, -25, 10, 0xd4a373);
      const jacket = this.add.rectangle(0, 3, 23, 20, 0x1a1a2e);
      jacket.setStrokeStyle(1.5, 0x00ffff, 0.8);
      const visor = this.add.rectangle(0, -25, 12, 3, 0x00ffff, 0.9);

      this.player.add([body, head, jacket, visor]);
    }

    this.player.setDepth(100);
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    // Recalculate shop positions
    const shopXPositions = [0.14, 0.30, 0.50, 0.70, 0.86];
    this.shopPositions = shopXPositions.map(percent => width * percent);

    // Update player position to follow current shop
    if (this.player) {
      this.player.setPosition(
        this.shopPositions[this.currentShopIndex],
        height * 0.80
      );
    }
  }

  private createShop(config: Shop, index: number): void {
    // Create invisible interactive hitbox (shops are in background)
    // Reduce height by 1/3 and adjust Y position to fit shops better
    const adjustedHeight = config.height * (2/3);
    const adjustedY = config.y - config.height / 6; // Move up by 1/6 of original height

    const hitbox = this.add.rectangle(config.x, adjustedY, config.width, adjustedHeight, 0xffffff, 0);
    hitbox.setInteractive({ useHandCursor: true });

    hitbox.on('pointerdown', () => {
      console.log(`Shop clicked: ${config.id} (${config.label})`);
      this.currentShopIndex = index;
      this.movePlayerToShop(config.x);
    });
  }

  private movePlayerToShop(targetX: number): void {
    this.tweens.add({
      targets: this.player,
      x: targetX,
      duration: 500,
      ease: 'Power2',
    });
  }

  public scrollLeft(): void {
    if (this.currentShopIndex > 0) {
      this.currentShopIndex--;
      this.movePlayerToShop(this.shopPositions[this.currentShopIndex]);
    }
  }

  public scrollRight(): void {
    if (this.currentShopIndex < this.SHOP_CONFIGS.length - 1) {
      this.currentShopIndex++;
      this.movePlayerToShop(this.shopPositions[this.currentShopIndex]);
    }
  }

  public goToStreet(direction: 'left' | 'right'): void {
    if (direction === 'left' && this.currentStreetIndex > 0) {
      this.currentStreetIndex--;
    } else if (direction === 'right' && this.currentStreetIndex < this.STREETS.length - 1) {
      this.currentStreetIndex++;
    }

    console.log(`Switched to: ${this.STREETS[this.currentStreetIndex].name}`);

    // Reset to middle shop position when changing streets
    this.currentShopIndex = 2;
    this.movePlayerToShop(this.shopPositions[this.currentShopIndex]);
  }

  public setStreetByName(streetName: string): void {
    const index = this.STREETS.findIndex(s => s.name === streetName);
    if (index !== -1) {
      this.currentStreetIndex = index;
      console.log(`Switched to: ${this.STREETS[this.currentStreetIndex].name}`);

      // Reset to middle shop position
      this.currentShopIndex = 2;
      this.movePlayerToShop(this.shopPositions[this.currentShopIndex]);
    }
  }

  public getCurrentStreet(): Street {
    return this.STREETS[this.currentStreetIndex];
  }

  public getAllStreets(): Street[] {
    return this.STREETS;
  }

  public toggleMusic(): boolean {
    if (!this.backgroundMusic) return false;

    if (this.backgroundMusic.isPlaying) {
      this.backgroundMusic.pause();
      return false; // Music is now paused
    } else {
      this.backgroundMusic.resume();
      return true; // Music is now playing
    }
  }

  public isMusicPlaying(): boolean {
    return this.backgroundMusic ? this.backgroundMusic.isPlaying : false;
  }
}
