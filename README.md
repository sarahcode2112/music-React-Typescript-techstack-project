# Noise-Maker

I built this web app draft in my earlier coding journey, to practice a modern Typescript/React techstack, with noise art-production as the product idea. I mainly coded this to practice with UI. (Therefore, the website does not produce noise as of now.)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

(The "start audio context" button is for debugging/development. It would not need to be there in final version.)

## Scripts

To install the dependencies, run:

### `npm install`

To start the app, run:

### `npm start`

## Vision for the future of the noise-production functionality:

This code uses useEffect hooks to update values for an 'audio context' whenever the volume, distortion, or reverb levels change. When the component is first rendered, an audio context is created, and an audio file is loaded, decoded, then manipulated with the levels. E.g.:
- When the volume changes, the gain node is updated with the new volume level.
- When the distortion level changes, the distortion effect is updated using a WaveShaper node.
- When the reverb level changes, the reverb effect is updated using a Convolver node

Some other futures improvements I could make include: 
- I could do a refactor to practice cleaner code.
- I also could clean up the appearance of these buttons: 'add noise editor' button (make the size match the existing noise editors), delete button (not line break after the icon), and the start/stop button (not breaking to two lines when screen is medium).
- Prevent the slider labels' text changing the label boxes' widths
