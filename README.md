# Project 3 Portfolio (React)

This repository is my personal React portfolio for CS 344 / CIT 336 Project 3.

## UI Features Added

1. Sticky navigation and sticky section headers. Keeps wayfinding visible while scrolling through long sections, using React component state for menu behavior and CSS `position: sticky` with blur/transparency styling.

2. Search + tag filtering on Skills, Projects, and Repositories. My skill set has a lot of overlap (Linux/hardware/audio/logistics all touch each other), so one long list is hard to scan. The per-section search bars let a visitor, or a recruiter, narrow the page down to just what they care about: typing `Linux` collapses Skills to just the Linux/Systems categories, and the navbar search does the same thing across every section at once. Built with React hooks (`useState`, `useMemo`) for live text and tag filtering, plus a shared `searchTerm` prop wired from the navbar through `App.js` into each filterable section.

3. Theme switcher (dark, light, sunset), top-right of the navbar. Dark is what I actually use, but graders reading on a bright laptop screen, or anyone with light sensitivity, need a way to make the site readable without leaving the page. Sunset exists because it makes certain elements more dramatic, no deeper reason than that. Top-right is the conventional spot for personalization controls on the web (Google, GitHub, most SaaS apps put it there), so it's discoverable without getting in the way of the main nav links in the center. Built with React state, `localStorage` persistence, and CSS custom properties (`:root[data-theme="..."]`).

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
