# Love Match

Love Match is a retro, 2005-style entertainment compatibility site built as a frontend-only app. Everything runs in the browser: the name match scoring, result display, and local record history are handled on the client side.

## Features

- 2005-era internet design with silver/gray UI and classic boxy layout
- Friendship and romantic modes
- Relationship selection for romantic mode without changing the algorithm
- Local, deterministic compatibility scoring
- Local browser history for recent matches
- Local admin-style record panel
- Mobile-friendly retro layout
- No backend required

## Tech Stack

- Frontend: React + Vite
- Styling: Plain CSS
- Storage: Browser localStorage
- No database or backend required

## Folder Structure

```text
love-match/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   └── (kept only as an unused legacy folder)
├── README.md
├── .gitignore
└── package-lock.json
```

## Install

```bash
cd love-match/frontend
npm install
```

## Run locally

```bash
cd love-match/frontend
npm run dev
```

Open the app in the browser at:

```text
http://localhost:5173
```

## Production build

```bash
cd love-match/frontend
npm run build
```

## Privacy

This app stores only the names and match metadata in the browser for local demo purposes. It does not collect passwords, contacts, or precise location data.

## Disclaimer

This project is for entertainment purposes only and does not claim scientific accuracy or predict real relationships.
