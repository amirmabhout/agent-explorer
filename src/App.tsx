import { useState, useCallback } from 'react';
import GameContainer from './components/GameContainer';
import UIOverlay from './components/UIOverlay';
import MainScene from './game/scenes/MainScene';

function App() {
  const [mainScene, setMainScene] = useState<MainScene | null>(null);

  const handleGameReady = useCallback((scene: MainScene) => {
    setMainScene(scene);
  }, []);

  const handleScrollLeft = useCallback(() => {
    if (mainScene) {
      mainScene.scrollLeft();
    }
  }, [mainScene]);

  const handleScrollRight = useCallback(() => {
    if (mainScene) {
      mainScene.scrollRight();
    }
  }, [mainScene]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <GameContainer onGameReady={handleGameReady} />
      <UIOverlay onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} />
    </div>
  );
}

export default App;
