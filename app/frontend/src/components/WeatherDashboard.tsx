import { useState, useEffect } from "react";
import { Search, MapPin, RefreshCw, CloudSun } from "lucide-react";
import { CurrentWeather } from "./CurrentWeather";
import { AnalyticsCards } from "./AnalyticsCards";
import { TemperatureChart } from "./TemperatureChart";
import { RainfallChart } from "./RainfallChart";
import { MonthlyComparison } from "./MonthlyComparison";
import { ForecastTable } from "./ForecastTable";
import {
  getGeoLocation,
  getCurrentWeather,
  getForecast,
  processDailyForecast,
  calculateAnalytics,
  generateMonthlyData,
  generateDemoData,
} from "@/services/weatherApi";
import type {
  CurrentWeatherData,
  ForecastItem,
  DailyForecast,
  MonthlyData,
  AnalyticsMetrics,
} from "@/types/weather";

export function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  // Load demo data on mount
  useEffect(() => {
    loadDemoData();
  }, []);

  function loadDemoData() {
    const demo = generateDemoData();
    setCurrentWeather(demo.current);
    setForecast(demo.forecast);

    const daily = processDailyForecast(demo.forecast);
    setDailyForecast(daily);

    const metrics = calculateAnalytics(demo.forecast, daily);
    setAnalytics(metrics);

    const monthly = generateMonthlyData(demo.forecast, demo.current.temp);
    setMonthlyData(monthly);

    setSearchedCity("London");
    setIsDemo(true);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setIsDemo(false);

    try {
      // Chain promises: geocode -> current weather + forecast
      const geoData = await getGeoLocation(city);
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(geoData.lat, geoData.lon),
        getForecast(geoData.lat, geoData.lon),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);

      const daily = processDailyForecast(forecastData);
      setDailyForecast(daily);

      const metrics = calculateAnalytics(forecastData, daily);
      setAnalytics(metrics);

      const monthly = generateMonthlyData(forecastData, weatherData.temp);
      setMonthlyData(monthly);

      setSearchedCity(weatherData.city);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";

      if (errorMessage.includes("401") || errorMessage.includes("Invalid API")) {
        setError(
          "API key not configured. Showing demo data. Add your OpenWeatherMap API key as VITE_OPENWEATHER_API_KEY environment variable."
        );
        loadDemoData();
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <CloudSun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WeatherAnalytics</h1>
              <p className="text-xs text-slate-400">Data-Driven Weather Insights</p>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="pl-9 pr-4 py-2 w-64 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Error/Demo Banner */}
        {error && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-300">
            {error}
          </div>
        )}

        {isDemo && !error && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-300">
            📊 Showing demo data for London. Enter a city name and add your{" "}
            <code className="bg-slate-800 px-1 rounded">VITE_OPENWEATHER_API_KEY</code>{" "}
            environment variable to see live weather data.
          </div>
        )}

        {/* Analytics Metrics */}
        {analytics && <AnalyticsCards metrics={analytics} />}

        {/* Current Weather + Temperature Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </div>
          <div className="lg:col-span-2">
            {forecast.length > 0 && <TemperatureChart data={forecast} />}
          </div>
        </div>

        {/* Rainfall + Monthly Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dailyForecast.length > 0 && <RainfallChart data={dailyForecast} />}
          {monthlyData.length > 0 && <MonthlyComparison data={monthlyData} />}
        </div>

        {/* Forecast Table */}
        {dailyForecast.length > 0 && <ForecastTable data={dailyForecast} />}

        {/* Footer */}
        <footer className="text-center py-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            Weather data powered by OpenWeatherMap API • Analytics dashboard built with
            React, Recharts & Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}