# 🌤️ Weather Data Analytics Dashboard

A modern, responsive React web application that transforms live meteorological data into actionable analytics. Built with **React 18**, **Vite**, and **Recharts**, this dashboard goes beyond simple weather tracking by computing key performance metrics (KPIs), rendering interactive trend charts, and presenting a detailed 5-day forecast.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-2.x-green)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

* **🔍 Live City Search:** Search weather for any city globally with current metrics (temperature, humidity, wind speed, atmospheric pressure, visibility).
* **📊 Analytics KPI Cards:** Computes aggregate stats across 40 data points (5-day window):
  * Average Temperature
  * Hottest & Coldest Days
  * Total Expected Rainfall
  * Average Humidity & Wind Speed
* **📈 Interactive Data Visualizations (Recharts):**
  * **Temperature Trend:** Area chart with gradient fills and average baseline indicators[cite: 2].
  * **Daily Rainfall:** Bar chart grouping precipitation totals per calendar day[cite: 2].
  * **Monthly Comparison:** Composed chart for historical / long-term data trends[cite: 2].
* **📅 5-Day Forecast Table:** Detailed tabular breakdown for quick planning[cite: 2].
* **⚡ Demo Mode:** Automatically loads fallback mock data (London) on startup if no key is provided[cite: 2].
* **📱 Fully Responsive:** Optimized layout across mobile, tablet, and desktop breakpoints[cite: 2].

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (Vite 5)[cite: 2]
* **HTTP Client:** Axios 1.x (sequential promise chaining)[cite: 2]
* **Data Visualizations:** Recharts 2.x[cite: 2]
* **Styling:** CSS Modules / Tailwind CSS[cite: 2]
* **Data Source:** OpenWeatherMap API (Geocoding, Current Weather, 5-Day Forecast)[cite: 2]
* **Testing:** Vitest + React Testing Library (100% test coverage on helper functions)[cite: 2]

---

## 📁 Repository Structure

```text
weather-analytics-dashboard/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Controlled city input component[cite: 2]
│   │   ├── CurrentWeather.jsx     # Current weather condition card[cite: 2]
│   │   ├── AnalyticsCards.jsx     # Renders calculated KPI cards[cite: 2]
│   │   ├── ForecastTable.jsx      # 5-day weather data table[cite: 2]
│   │   └── Charts/                # Recharts visualization components[cite: 2]
│   ├── utils/
│   │   └── weatherHelpers.js      # Pure functions for statistics & conversions[cite: 2]
│   ├── App.jsx                    # Root state & API fetch handlers[cite: 2]
│   └── main.jsx
├── tests/                         # Vitest unit & integration tests[cite: 2]
├── .env.example                   # Environment variable template
├── package.json
└── README.md
