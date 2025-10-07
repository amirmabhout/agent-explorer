import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from '../game/config';
import MainScene from '../game/scenes/MainScene';

interface GameContainerProps {
  onGameReady: (scene: MainScene) => void;
}

export default function GameContainer({ onGameReady }: GameContainerProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    // Initialize Phaser game
    gameRef.current = new Phaser.Game(gameConfig);

    // Wait for scene to be ready
    gameRef.current.events.once('ready', () => {
      const scene = gameRef.current?.scene.getScene('MainScene') as MainScene;
      if (scene) {
        onGameReady(scene);
      }
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onGameReady]);

  return (
    <div
      ref={containerRef}
      id="game-container"
      className="flex items-center justify-center w-full h-full"
    />
  );
}
