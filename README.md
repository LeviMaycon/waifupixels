# Waifu Pixels

A curated anime image gallery powered by [waifu.pics](https://waifu.pics) and [Nekos API](https://nekosapi.com).

---

## Features

- Browse 15+ SFW categories from waifu.pics
- Search images by tag using Nekos API
- Infinite scroll Reels mode
- Favorite and download images
- Fully responsive — desktop and mobile

---

## Stack

- Next.js 15 (App Router)
- Tailwind CSS
- TypeScript

---

## APIs

| API | Usage |
|-----|-------|
| [waifu.pics](https://api.waifu.pics) | Category browsing (`/many` endpoint) |
| [Nekos API v4](https://api.nekosapi.com/v4) | Tag search, random images |

---

## Getting Started
```bash
git clone https://github.com/your-username/waifupixels
cd waifupixels
npm install
```

Create a `.env.local` file:
```env
WAIFU_API=https://api.waifu.pics/
NEKOS_API=https://api.nekosapi.com/v4/images
```
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Structure
```
app/
├── waifu/[type]/[category]   # Category pages
├── nekos/explore             # Tag search
├── reels                     # Infinite scroll mode
├── favorites                 # Saved images
└── api/
    ├── waifu                 # waifu.pics proxy
    ├── nekos                 # Nekos API proxy
    └── download              # Image download proxy
```

---

## Screenshots

![Gallery](https://github.com/user-attachments/assets/3eaf1e23-e57a-44f9-9ca0-e14aa4a285e2)

![Explore](https://github.com/user-attachments/assets/ea8d2ea0-5bf3-423d-a88d-1de151874130)

![Reels](https://github.com/user-attachments/assets/9731ec6b-d98a-4c49-93e8-c28c80ddd807)

---

## License

MIT
