// DOM Elements
const INPUT_GENRE = document.getElementById('genre-input');
const SUGGEST_BUTTON = document.getElementById('suggest-button');
const BUTTON_TEXT = document.getElementById('button-text');
const LOADING_SPINNER = document.getElementById('loading-spinner');
const RESULTS_TITLE = document.getElementById('results-title');
const MOVIE_RESULT = document.getElementById('movie-result');
const SOURCES_AREA = document.getElementById('sources-area');
const SOURCES_LIST = document.getElementById('sources-list');

// API Setup
const API_KEY = "AIzaSyCor9QzI-oTFYKMO9pU6wN0v1EazY0cwJI";
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

// Utility UI Toggle
function setUIState(isLoading) {
    SUGGEST_BUTTON.disabled = isLoading;
    BUTTON_TEXT.classList.toggle('hidden', isLoading);
    LOADING_SPINNER.classList.toggle('hidden', !isLoading);
}

// Display result + sources
function displayResult(text, sources) {
    MOVIE_RESULT.innerHTML = text.replace(/\n/g, '<br>');
    RESULTS_TITLE.classList.remove('hidden');
    SOURCES_LIST.innerHTML = '';

    if (sources && sources.length > 0) {
        SOURCES_AREA.classList.remove('hidden');
        sources.forEach(source => {
            if (source.uri && source.title) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = source.uri;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.className = "text-primary hover:underline block truncate max-w-full";
                a.textContent = source.title;
                li.appendChild(a);
                SOURCES_LIST.appendChild(li);
            }
        });
    } else {
        SOURCES_AREA.classList.add('hidden');
    }
}

// Retry wrapper for fetch
async function fetchWithRetry(url, payload, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) return response.json();

            throw new Error(`HTTP error: ${response.status}`);
        } catch (err) {
            if (i === maxRetries - 1) throw err;
            await new Promise(res => setTimeout(res, Math.pow(2, i) * 1000));
        }
    }
}

// Core logic
async function generateMovieSuggestion() {
    const genre = INPUT_GENRE.value.trim();
    if (!genre) {
        MOVIE_RESULT.innerHTML = '<p class="text-red-600">Please enter a movie genre!</p>';
        return;
    }

    setUIState(true);

    MOVIE_RESULT.innerHTML =
        `<p class="text-gray-500 italic text-center">Searching for a great <strong>${genre}</strong> movie...</p>`;

    const userQuery = `Suggest one highly-rated movie from the "${genre}" genre. Include title, year, and a short description.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ google_search: {} }],
        systemInstruction: {
            parts: [{ text: "Provide one excellent movie recommendation." }]
        }
    };

    try {
        const result = await fetchWithRetry(API_URL, payload);
        const candidate = result.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text || "No suggestion available.";

        let sources = [];
        const meta = candidate?.groundingMetadata?.groundingAttributions || [];
        meta.forEach(a => {
            if (a.web?.uri && a.web?.title) {
                sources.push({ uri: a.web.uri, title: a.web.title });
            }
        });

        displayResult(text, sources);
    } catch (error) {
        displayResult("Error connecting to service. Please try again.", []);
    } finally {
        setUIState(false);
    }
}

// Enable Enter key
INPUT_GENRE.addEventListener('keydown', e => {
    if (e.key === 'Enter') generateMovieSuggestion();
});

// Button click
SUGGEST_BUTTON.addEventListener('click', generateMovieSuggestion);
