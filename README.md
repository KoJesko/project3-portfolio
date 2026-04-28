# Project 3 Portfolio (React)

This repository is my personal React portfolio for CS 344 / CIT 336 Project 3.

## UI Features Added

1. Sticky navigation and sticky section headers
- Why: Keeps wayfinding visible while scrolling through long sections.
- Tools used: React component state for menu behavior and CSS `position: sticky` with blur/transparency styling.

2. Search + tag filtering on Skills, Projects, and Repositories
- Why: My skill set has a lot of overlap (Linux/hardware/audio/logistics all touch each other), so a single long list is hard to scan. The per-section search bars let a visitor (or a recruiter) narrow the page down to just the topics or technologies they actually care about — for example typing `Linux` collapses Skills down to only the categories tagged Linux/Systems, and the navbar search does the same thing across every section at once.
- Tools used: React hooks (`useState`, `useMemo`) for live text and tag filtering, plus a shared `searchTerm` prop wired from the navbar through `App.js` into each filterable section.

3. Theme switcher (dark, light, sunset) — placed in the top-right of the navbar
- Why: The default dark theme is what I prefer, but other viewers (especially graders reading on a bright laptop screen, or anyone with light sensitivity) need an easy way to make the site readable for them. The switcher gives them visual control without leaving the page.
- Why Sunset: Sunset makes certain elements more dramatic.
- Why top-right: Top-right is the conventional location for personalization and account/settings controls on the web (think Google, GitHub, almost every SaaS app). Putting it there makes the control discoverable without users having to hunt for it, and keeps it out of the way of the primary navigation links in the center.
- Tools used: React state + `localStorage` persistence + CSS custom properties (`:root[data-theme="..."]`).

## Additional Interactivity

- Animated interactive cards for Skills/Projects/Pride sections.
- Hamburger menu for mobile navigation.
- Read more/less accordion in About section.
- Easter egg (typing `236` outside any text input):
	- Why: I'm a big Euro Truck Simulator 2 player. In ETS2, road **CD** (the Calais–Duisburg loop) is infamous in the multiplayer community for constant crashes and chaotic driving — "236" is a personal nod to that road and to that part of the sim-racing community. It is the length of the road in miles. I added it as a hidden, harmless personality detail rather than a feature on the page.
- Hovering selected cards reveals hidden notes.

## Run Locally

In the project directory, run:

- `npm install`
- `npm start`

Open [http://localhost:3000](http://localhost:3000).

## Build and Test

- `npm run build`
- `npm test`

## Runs at: https://kojesko.dev
