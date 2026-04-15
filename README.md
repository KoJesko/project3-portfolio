# Project 3 Portfolio (React)

This repository is my personal React portfolio for CS 344 / CIT 336 Project 3.

## UI Features Added

1. Sticky navigation and sticky section headers
- Why: Keeps wayfinding visible while scrolling through long sections.
- Tools used: React component state for menu behavior and CSS `position: sticky` with blur/transparency styling.

2. Search + tag filtering on Skills and Projects
- Why: Lets visitors quickly filter my portfolio by topics and technologies they care about.
- Tools used: React hooks (`useState`, `useMemo`) to perform live text and tag filtering.

3. Theme switcher (dark, light, sunset)
- Why: Improves accessibility and gives users visual control.
- Tools used: React state + `localStorage` persistence + CSS custom properties (`:root[data-theme="..."]`).

## Additional Interactivity

- Animated interactive cards for Skills/Projects/Pride sections.
- Hamburger menu for mobile navigation.
- Read more/less accordion in About section.
- Easter eggs:
	- Type `236` outside any text input to open the video modal and run TTS speech (`"rec ban"`).
	- Hovering selected cards reveals hidden notes.

## Run Locally

In the project directory, run:

- `npm install`
- `npm start`

Open [http://localhost:3000](http://localhost:3000).

## Build and Test

- `npm run build`
- `npm test`
