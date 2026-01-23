```markdown
# Wanderlust ✈️🌍

A lightweight listings & reviews web app for travelers — discover places, read verified reviews, and share your favorite spots with a beautiful, responsive UI.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/JavaScript%20%7C%20CSS%20%7C%20EJS-lightgrey)](https://github.com/ManasaPrakash18/Wanderlust)
[![Made with Node.js](https://img.shields.io/badge/Node.js-%EF%B8%8F-brightgreen)](https://nodejs.org/)

Live demo: https://wanderlust-k4ax.onrender.com

---

Problem statement
- Travelers and explorers struggle to find reliable recommendations and verified reviews for places in one unified platform. Wanderlust solves this by offering a lightweight, community-driven listings & review site where people can discover, share, and validate travel experiences in a single place.

One-line pitch
- Share places. Read trusted reviews. Plan better trips.

Key features
- Elegant, responsive UI built with EJS + CSS
- User authentication, profiles, and session handling
- Create, edit, and delete listings (CRUD) with images
- Post reviews and ratings — verified authorship for credibility
- Map integration for geolocated listings
- Cloud image upload support (Cloudinary or configurable provider)
- Clean MVC structure for easy contribution and extension

Tech stack
- Node.js + Express
- EJS server-side templating
- MongoDB + Mongoose
- Cloud image storage (e.g., Cloudinary)
- Vanilla CSS (mobile-first responsive design)

Language composition (repo analysis)
- JavaScript: 36.4%
- CSS: 33.1%
- EJS: 30.5%

Screenshots
- Add images to ./screenshots:
  - ./screenshots/home.png
  - ./screenshots/listing.png
  - ./screenshots/new-listing.png

Table of contents
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Run scripts](#run-scripts)
- [Project structure](#project-structure)
- [Development notes](#development-notes)
- [Deployment tips](#deployment-tips)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

Getting started

1. Clone
```bash
git clone https://github.com/ManasaPrakash18/Wanderlust.git
cd Wanderlust
```

2. Install
```bash
npm install
```

3. Environment
Create a `.env` in the project root. Example variables the app commonly uses:
```env
DATABASE_URL=mongodb://localhost:27017/wanderlust
PORT=3000
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Adjust keys to match your code. If your app uses different variable names (e.g., MONGODB_URI), use those instead.

4. Run
```bash
# Development (recommended with nodemon)
npm run dev

# Production
npm start
```
Visit http://localhost:3000

Run scripts (recommended additions to package.json)
```json
{
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Project structure (high level)
- app.js — Express app & middleware setup
- index.js — server launcher
- controllers/ — route handlers and business logic
- models/ — Mongoose schemas (Listing, Review, User)
- routes/ — Express route definitions
- views/ — EJS templates & partials
- public/ — static assets (css, js, images)
- utils/ — helpers (wrapAsync, ExpressError)
- screenshots/ — optional demo images

Development notes
- Centralized error handling: utils/ExpressError.js
- Async route wrapper: utils/wrapAsync.js to reduce try/catch duplication
- Layout template: views/layouts/boilerplate.ejs and partials under views/includes
- Keep secrets out of repo — use .env and a secret manager for production

Security & best practices
- Use strong SESSION_SECRET and set NODE_ENV=production for production runs
- Use HTTPS for deployed instances and secure cookie flags
- Sanitize user input and validate file uploads (limit size & file types)
- Use a managed DB (MongoDB Atlas) for production reliability

Deployment tips
- Use DATABASE_URL pointing to a managed DB like Atlas
- Set CLOUDINARY_* env vars (or configure your chosen storage)
- Use a process manager (PM2) or platform (Render, Heroku, Railway, VPS)
- Set environment variables in the host environment — do not commit .env

Contributing
Thanks for considering contributing! Quick workflow:
1. Fork the repo and create a branch: git checkout -b feat/your-feature
2. Keep PRs small and focused
3. Add tests or steps to reproduce for bug fixes
4. Open a PR with screenshots and clear testing instructions

Suggested improvements you can help with
- Add automated tests (Jest / Supertest)
- CI workflow (GitHub Actions)
- Improve accessibility and WCAG compliance
- Add more granular moderation for reviews


Contact
- Maintainer: ManasaPrakash18 — https://github.com/ManasaPrakash18

Acknowledgements
- Thanks to Express & Mongoose ecosystems, the community tutorials that inspired this layout, and UI resources for design inspiration.

```
