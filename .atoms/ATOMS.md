# Project Context

## Project Overview
Weather Data Analytics Dashboard - A comprehensive web application that fetches weather data from OpenWeatherMap API and provides analytics including average temperature, hottest/coldest month analysis, rainfall trends, and weather forecasting with interactive charts and visualizations.

## Key Decisions
| Date | Decision | By | Rationale |
|------|----------|-----|-----------|
| 2026-06-07 | Use Recharts for data visualization | Alex | React-native charting library, lightweight, composable |
| 2026-06-07 | Use OpenWeatherMap free API | Alex | As specified in assignment, provides current weather + 5-day forecast |
| 2026-06-07 | Dark theme dashboard design | Alex | Professional analytics aesthetic, better data visualization contrast |
| 2026-06-07 | Simulate monthly data from forecast | Alex | Free API tier only provides 5-day forecast, extrapolate for monthly view |

## Constraints
- Design: Dark theme analytics dashboard with blue/cyan accent colors
- Color Palette: Dark navy (#0f172a) background, slate cards (#1e293b), cyan accents (#06b6d4), blue highlights (#3b82f6)
- Typography: Inter font family, clean modern sans-serif
- Layout: Sidebar navigation + main content grid with responsive cards
- API: OpenWeatherMap free tier (current weather + 5-day/3-hour forecast)
- Charts: Recharts library for Line, Bar, Area charts
- Images to Generate: 4 images (hero background, logo, temperature visual, weather card background)