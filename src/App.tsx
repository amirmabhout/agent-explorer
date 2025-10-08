import { useState, useCallback, useEffect } from 'react';
import GameContainer from './components/GameContainer';
import UIOverlay from './components/UIOverlay';
import MainScene, { Street } from './game/scenes/MainScene';

function App() {
  const [mainScene, setMainScene] = useState<MainScene | null>(null);
  const [currentStreet, setCurrentStreet] = useState<string>('Generative Markets Street');
  const [allStreets, setAllStreets] = useState<Street[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);

  const handleGameReady = useCallback((scene: MainScene) => {
    setMainScene(scene);
    // Get initial street data
    setCurrentStreet(scene.getCurrentStreet().name);
    setAllStreets(scene.getAllStreets());
    // Set initial music state
    setIsMusicPlaying(scene.isMusicPlaying());
  }, []);

  const handleStreetLeft = useCallback(() => {
    if (mainScene) {
      mainScene.goToStreet('left');
      setCurrentStreet(mainScene.getCurrentStreet().name);
    }
  }, [mainScene]);

  const handleStreetRight = useCallback(() => {
    if (mainScene) {
      mainScene.goToStreet('right');
      setCurrentStreet(mainScene.getCurrentStreet().name);
    }
  }, [mainScene]);

  const handleStreetSelect = useCallback((streetName: string) => {
    if (mainScene) {
      mainScene.setStreetByName(streetName);
      setCurrentStreet(streetName);
    }
  }, [mainScene]);

  const handleMusicToggle = useCallback(() => {
    if (mainScene) {
      const isPlaying = mainScene.toggleMusic();
      setIsMusicPlaying(isPlaying);
    }
  }, [mainScene]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <GameContainer onGameReady={handleGameReady} />
      <UIOverlay
        onStreetLeft={handleStreetLeft}
        onStreetRight={handleStreetRight}
        currentStreet={currentStreet}
        allStreets={allStreets}
        onStreetSelect={handleStreetSelect}
        onMusicToggle={handleMusicToggle}
        isMusicPlaying={isMusicPlaying}
      />
    </div>
  );
}

export default App;
