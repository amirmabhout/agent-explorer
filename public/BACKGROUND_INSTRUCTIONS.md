# Background Image Setup

To complete the setup, you need to add the cyberpunk cityscape background image:

## Instructions:

1. **Save your background image** (the purple cyberpunk cityscape with reflections) to this folder (`public/`)

2. **Name the file**: `background.jpg` (or `background.png` if it's a PNG)

3. **File location**: The final path should be:
   ```
   public/background.jpg
   ```

4. **Image requirements**:
   - Recommended width: 1920px or larger
   - Recommended height: 1080px (will be scaled to 600px in-game)
   - The ground line in the image should be roughly at the middle (vertical center)
   - Format: JPG or PNG

5. **If using PNG instead of JPG**:
   - Rename the file to `background.png`
   - Update `src/game/scenes/MainScene.ts` line 70:
     ```typescript
     this.load.image('cyberpunk-bg', '/background.png');  // Change .jpg to .png
     ```

## Current Status:
⚠️ **Background image not found** - The app will show an error until you add the image.

Once you add the image, the shops will appear positioned at the ground line of your cyberpunk cityscape!
