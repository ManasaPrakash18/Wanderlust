# Wanderlust ✈️🌍

A lightweight listings & reviews web app for travelers — discover places, read verified reviews, and share your favorite spots with a beautiful, responsive UI.

 | **Built with:** Node.js, Express, MongoDB, EJS

---
live demo : https://wanderlust-k4ax.onrender.com
## Problem Statement

Travelers and explorers struggle to find reliable recommendations and verified reviews for places in one unified platform. Wanderlust solves this by offering a lightweight, community-driven listings & review site where people can discover, share, and validate travel experiences in a single place.

**One-line pitch:** Share places. Read trusted reviews. Plan better trips.

---

## Key Features

- Elegant, responsive UI built with EJS + CSS
- User authentication, profiles, and session handling
- Create, edit, and delete listings (CRUD) with images
- Post reviews and ratings — verified authorship for credibility
- Map integration for geolocated listings
- Cloud image upload support (Cloudinary or configurable)
- Clean MVC structure for easy contribution

## Tech Stack

- **Runtime:** Node.js + Express
- **Templating:** EJS server-side templating
- **Database:** MongoDB + Mongoose
- **Storage:** Cloud image storage (e.g., Cloudinary)
- **Styling:** Vanilla CSS (mobile-first responsive design)

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/ManasaPrakash18/Wanderlust.git
cd Wanderlust
```

### 2. Install

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root with these variables:

```env
DATABASE_URL=mongodb://localhost:27017/wanderlust
PORT=3000
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Adjust keys to match your code configuration.

### 4. Run

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Open http://localhost:3000 in your browser.

---

## Run Scripts

Add these to `package.json`:

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## Project Structure

- **app.js** — Express app & middleware setup
- **index.js** — server launcher
- **controllers/** — route handlers and business logic
- **models/** — Mongoose schemas (Listing, Review, User)
- **routes/** — Express route definitions
- **views/** — EJS templates & partials
- **public/** — static assets (CSS, JS, images)
- **utils/** — helpers (wrapAsync, ExpressError)

---

## Development Notes

- **Error handling:** See [utils/ExpressError.js](utils/ExpressError.js)
- **Async routes:** [utils/wrapAsync.js](utils/wrapAsync.js) reduces try/catch duplication
- **Layout template:** [views/layouts/boilerplate.ejs](views/layouts/boilerplate.ejs) 
  with partials in [views/includes](views/includes)
- **Secrets:** Keep .env out of git — use environment variables in production

---

## Security & Best Practices

- Use strong `SESSION_SECRET` in production
- Set `NODE_ENV=production` for deployed instances
- Use HTTPS and secure cookie flags
- Sanitize user input and validate file uploads
- Use a managed database (MongoDB Atlas) for reliability

---

## Deployment Tips

- Point `DATABASE_URL` to a managed service like MongoDB Atlas
- Configure `CLOUDINARY_*` env vars (or your chosen storage)
- Use a process manager (PM2) or platform (Render, Heroku, Railway)
- Set environment variables in the host — do not commit .env

---

## Contributing

Thanks for considering contributing! Quick workflow:

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Keep PRs small and focused
3. Add tests or steps to reproduce for bug fixes
4. Open a PR with screenshots and clear testing instructions

**Suggested improvements:**
- Add automated tests (Jest / Supertest)
- CI workflow (GitHub Actions)
- Improve accessibility (WCAG compliance)
- Add review moderation features

---

## Contact

**Maintainer:** ManasaPrakash18 — [GitHub Profile](https://github.com/ManasaPrakash18)

---

## Acknowledgements

Thanks to the Express & Mongoose ecosystems, community tutorials, and design resources that inspired this project.
