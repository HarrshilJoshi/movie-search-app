# 🎬 Movie Search App

A sleek and fast movie search app built with **React + Vite**, powered by **TMDB API** for fetching movie data and **Appwrite** for tracking trending searches based on user interactions.

---

## 🔍 Features

- 🔎 Search for movies in real-time using the TMDB API
- 🎥 Click on a movie to increase its popularity count
- 📈 View the most trending movies dynamically
- ⚡️ Fast performance with Vite and Debounce logic
- ☁️ Backend integrated using Appwrite (database & document updates)

---

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (or your preferred CSS system)
- **Backend**: Appwrite (for DB, document updates)
- **API**: TMDB (The Movie Database)
- **Hosting**: Vercel (for frontend)

---

## ⚙️ Environment Variables

Before running the project, create a `.env` file in the root and include the following:

```env
VITE_TMBD_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
