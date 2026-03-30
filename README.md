# RetroAni

A retro 90s Japanese anime-themed web app for browsing and tracking anime. Built with React and styled with a nostalgic pixel-perfect aesthetic.

## Description

RetroAni is a modern anime list application that brings back the nostalgic vibes of 90s Japanese anime culture. Browse top anime, search for your favorites, view detailed information, and manage your personal watchlist with a unique retro-inspired UI featuring scanline effects, pixel fonts, and vibrant neon colors.

## Tech Stack

- **React** - UI library for building component-based interfaces
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API requests
- **TanStack Query (React Query)** - Data fetching, caching, and state management
- **Jikan API** - MyAnimeList unofficial API for anime data

## Design Features

- Retro 90s anime aesthetic with pixel fonts
- Custom color palette (hot pink, electric yellow, deep blue)
- Scanline overlay effect
- Custom scrollbar styling
- Pixel glow effects on hover
- Fully responsive design with mobile hamburger menu

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Folder Structure

```
src/
├── assets/          # Images, icons, and static assets
├── components/      # Reusable UI components (Navbar, Cards, etc.)
├── hooks/           # Custom React hooks
├── pages/           # Page components (Home, Search, Detail, etc.)
├── services/        # API services and external integrations
│   └── jikanApi.js  # Jikan API functions
├── App.tsx          # Main app component with routing
├── main.tsx         # App entry point
└── index.css        # Global styles and Tailwind imports
```

## Routes

- `/` - Home page with top anime
- `/search` - Search anime by keyword
- `/anime/:id` - Anime detail page
- `/watchlist` - Personal watchlist
- `*` - 404 Not Found page

## API Integration

The app uses the [Jikan API](https://jikan.moe/) to fetch anime data from MyAnimeList. All API functions are centralized in `src/services/jikanApi.js`.

Available functions:
- `getTopAnime(page, limit)` - Fetch top-rated anime
- `searchAnime(query, page, limit)` - Search anime by keyword
- `getAnimeById(id)` - Get detailed anime information
- `getAnimeEpisodes(id, page)` - Fetch episode list for an anime

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=https://api.jikan.moe/v4
```

## License

MIT
