# UmmahPlay

UmmahPlay is a static Islamic learning platform with a calm dashboard and structured study flow. It combines:

- YouTube Data API for embeddable Islamic video discovery
- `alquran.cloud` for surah text, translation, audio, and topic search
- `localStorage` for playlist, bookmarks, last read, and lightweight response caching

## Pages

- `index.html`: Home dashboard with continue-learning, daily ayah, and reflection lane
- `quran.html`: Sacred reading space with surah navigation, audio, and bookmarks
- `categories.html`: Learn hub with topic filters and playlist-style learning paths
- `library.html`: Personal library with bookmarks, saved videos, history, and collections
- `search.html`: Unified search for Quran topics and embeddable video content
- `watch.html`: Focused player page with related videos and save actions

## Setup

1. Start the built-in local server:

```powershell
node server.js
```

2. Open `http://localhost:8080/`
3. Add a restricted YouTube Data API key using the `API Key` button in the header.
4. Quran reading works without any key.

Windows shortcut:

- Double-click `start-ummahplay.bat`

VS Code:

- The existing `Launch Chrome against localhost` profile now starts the local server automatically.

## Notes

- Videos are embedded from YouTube only. The app does not host copyrighted video files.
- The YouTube API key is stored only in your current browser profile.
- Library, bookmarks, history, and collections are stored in localStorage.
