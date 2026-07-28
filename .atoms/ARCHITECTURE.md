# Architecture Design

## System Overview
Single-page React application with a dark-themed analytics dashboard layout. Fetches weather data from OpenWeatherMap API and processes it client-side for visualization and analytics.

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- shadcn/ui (UI components)
- Recharts (charts/visualization)
- Axios (HTTP client)
- date-fns (date formatting)

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Pages | Main dashboard page | src/pages/Index.tsx |
| Components | Dashboard widgets | src/components/WeatherDashboard.tsx |
| Services | API communication | src/services/weatherApi.ts |
| Types | TypeScript interfaces | src/types/weather.ts |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Chart Library | Recharts | React-native, composable, good dark theme support |
| HTTP Client | Axios | Promise-based, interceptors, as specified in assignment |
| Date Handling | date-fns | Lightweight, tree-shakeable |
| State Management | React useState/useEffect | Simple enough for single-page dashboard |

## File Tree Plan
```
src/
├── pages/
│   └── Index.tsx          # Main dashboard page
├── components/
│   ├── WeatherDashboard.tsx  # Main dashboard layout & orchestration
│   ├── CurrentWeather.tsx    # Current weather display card
│   ├── AnalyticsCards.tsx    # Key metrics cards
│   ├── TemperatureChart.tsx  # Temperature trends line chart
│   ├── RainfallChart.tsx     # Rainfall bar chart
│   └── ForecastTable.tsx     # 5-day forecast table
├── services/
│   └── weatherApi.ts         # OpenWeatherMap API service
├── types/
│   └── weather.ts            # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Implementation Guide
1. Define TypeScript types for API responses and processed data
2. Create weather API service with geocoding + weather + forecast endpoints
3. Build dashboard layout with dark theme
4. Implement each widget component with Recharts for charts
5. Wire everything together in the main dashboard component