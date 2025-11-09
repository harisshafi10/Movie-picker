
# Movie Picker – Gemini API + Tailwind

A simple and elegant web app that recommends a movie based on the genre you enter.  
Powered by Google’s **Gemini 2.5 Flash** model, styled with **TailwindCSS**, and built using clean modular separation of HTML, CSS, and JavaScript.

The app fetches **live web-grounded movie suggestions** using Google Search via Gemini’s API.

---

## Features

- Enter any movie genre (Action, Thriller, Sci-Fi, etc.)
- AI suggests:
  - A highly-rated movie  
  - Release year  
  - One-sentence description  
- Clean UI with TailwindCSS
- Loading animation for better UX
- Error handling with retry logic
- External links to sources (Google Search grounding)
- Fully separated structure:
  - `index.html`
  - `styles.css`
  - `app.js`

---

## Demo

You can host this on GitHub Pages, Netlify, or Vercel.

---

## Tech Stack

- HTML5  
- CSS3 + TailwindCSS  
- JavaScript (Vanilla)  
- Google Gemini API  
- Fetch API with retry logic  

---

## Project Structure

```
/movie-picker
│
├── index.html        # Main UI
├── styles.css        # Custom animations + typography
├── app.js            # API logic + DOM manipulation
└── README.md
```

---

## How It Works

1. User enters a movie genre.
2. The script sends the query to Gemini’s API:
   - Model: `gemini-2.5-flash-preview-09-2025`
   - Tool: `google_search`
3. The API returns:
   - One movie recommendation
   - Source links from real web results
4. The UI displays:
   - Title, year, and short description  
   - Clickable sources

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### 2. Add your Gemini API key

In `app.js`, find:

```javascript
const API_KEY = "";
```

Replace with:

```javascript
const API_KEY = "YOUR_GEMINI_API_KEY";
```

Get a free Gemini API key here:  
https://aistudio.google.com

---

## Running the App

Because this is a static site, you can simply open:

```
index.html
```

Or run it on a local server:

### VS Code

Right-click → **Open with Live Server**

### Node.js

```bash
npx serve
```

---

## Screenshots

no screenshots right now

```md
![Screenshot](./screenshot.png)
```

---

## API Notes

- Uses the `generateContent` endpoint:

```
https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent
```

- Includes retry logic for:
  - API rate limits  
  - Network failures  
- Uses Google’s grounded search to provide real citations.

---

## Future Improvements

- Search by actor or director  
- Return multiple movie suggestions  
- Dark mode  
- Save recommendation history  
- Deploy to Vercel/Netlify  
- Add TMDB API integration  

---

## License

MIT License — free to use and modify.
