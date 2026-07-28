import axios from "axios";
import { format } from "date-fns";
import type {
  GeoLocation,
  CurrentWeatherData,
  ForecastItem,
  DailyForecast,
  MonthlyData,
  AnalyticsMetrics,
} from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org";

// Use a demo API key for demonstration - users should replace with their own
const DEMO_API_KEY = "demo_key";

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY || DEMO_API_KEY;
  return key;
}

export async function getGeoLocation(city: string): Promise<GeoLocation> {
  const response = await axios.get(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${getApiKey()}`
  );
  if (!response.data || response.data.length === 0) {
    throw new Error(`City "${city}" not found`);
  }
  return response.data[0];
}

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeatherData> {
  const response = await axios.get(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${getApiKey()}&units=metric`
  );
  const data = response.data;
  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind_speed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
    dt: data.dt,
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
    visibility: data.visibility,
  };
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<ForecastItem[]> {
  const response = await axios.get(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${getApiKey()}&units=metric`
  );
  return response.data.list.map(
    (item: {
      dt: number;
      main: { temp: number; temp_min: number; temp_max: number; humidity: number };
      weather: { description: string; icon: string }[];
      wind: { speed: number };
      rain?: { "3h"?: number };
      dt_txt: string;
    }) => ({
      dt: item.dt,
      temp: Math.round(item.main.temp * 10) / 10,
      temp_min: Math.round(item.main.temp_min * 10) / 10,
      temp_max: Math.round(item.main.temp_max * 10) / 10,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      wind_speed: item.wind.speed,
      rain: item.rain?.["3h"] || 0,
      date: format(new Date(item.dt_txt), "MMM dd"),
      time: format(new Date(item.dt_txt), "HH:mm"),
    })
  );
}

export function processDailyForecast(
  forecastItems: ForecastItem[]
): DailyForecast[] {
  const dailyMap = new Map<string, ForecastItem[]>();

  forecastItems.forEach((item) => {
    const dateKey = item.date;
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, []);
    }
    dailyMap.get(dateKey)!.push(item);
  });

  const dailyForecasts: DailyForecast[] = [];
  dailyMap.forEach((items, date) => {
    const temps = items.map((i) => i.temp);
    const humidities = items.map((i) => i.humidity);
    const winds = items.map((i) => i.wind_speed);
    const rains = items.map((i) => i.rain);

    // Get the midday item for description/icon
    const middayItem =
      items.find((i) => i.time === "12:00") || items[Math.floor(items.length / 2)];

    dailyForecasts.push({
      date,
      dayName: format(new Date(items[0].dt * 1000), "EEEE"),
      temp_avg: Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10,
      temp_min: Math.round(Math.min(...temps) * 10) / 10,
      temp_max: Math.round(Math.max(...temps) * 10) / 10,
      humidity_avg: Math.round(
        humidities.reduce((a, b) => a + b, 0) / humidities.length
      ),
      rain_total: Math.round(rains.reduce((a, b) => a + b, 0) * 10) / 10,
      description: middayItem.description,
      icon: middayItem.icon,
      wind_avg: Math.round((winds.reduce((a, b) => a + b, 0) / winds.length) * 10) / 10,
    });
  });

  return dailyForecasts;
}

export function calculateAnalytics(
  forecastItems: ForecastItem[],
  dailyForecasts: DailyForecast[]
): AnalyticsMetrics {
  const allTemps = forecastItems.map((i) => i.temp);
  const avgTemperature =
    Math.round((allTemps.reduce((a, b) => a + b, 0) / allTemps.length) * 10) / 10;

  const hottestIdx = allTemps.indexOf(Math.max(...allTemps));
  const coldestIdx = allTemps.indexOf(Math.min(...allTemps));

  const totalRainfall =
    Math.round(forecastItems.reduce((sum, i) => sum + i.rain, 0) * 10) / 10;

  const avgHumidity = Math.round(
    forecastItems.reduce((sum, i) => sum + i.humidity, 0) / forecastItems.length
  );

  const avgWindSpeed =
    Math.round(
      (forecastItems.reduce((sum, i) => sum + i.wind_speed, 0) /
        forecastItems.length) *
        10
    ) / 10;

  return {
    avgTemperature,
    hottestDay: {
      date: forecastItems[hottestIdx].date,
      temp: forecastItems[hottestIdx].temp,
    },
    coldestDay: {
      date: forecastItems[coldestIdx].date,
      temp: forecastItems[coldestIdx].temp,
    },
    totalRainfall,
    avgHumidity,
    avgWindSpeed,
  };
}

export function generateMonthlyData(
  forecastItems: ForecastItem[],
  currentTemp: number
): MonthlyData[] {
  // Generate simulated monthly data based on current conditions and forecast trends
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const currentMonth = new Date().getMonth();

  // Use forecast data to establish baseline variations
  const avgForecastTemp =
    forecastItems.reduce((sum, i) => sum + i.temp, 0) / forecastItems.length;
  const avgRain =
    forecastItems.reduce((sum, i) => sum + i.rain, 0) / forecastItems.length;
  const avgHumidity =
    forecastItems.reduce((sum, i) => sum + i.humidity, 0) / forecastItems.length;

  // Temperature variation pattern (Northern Hemisphere typical)
  const tempVariation = [-12, -10, -5, 0, 5, 10, 12, 11, 7, 2, -4, -9];
  const rainVariation = [0.8, 0.7, 0.9, 1.2, 1.1, 0.8, 0.6, 0.7, 0.9, 1.1, 1.0, 0.9];

  return months.map((month, idx) => {
    const offset = tempVariation[idx] - tempVariation[currentMonth];
    const baseTemp = avgForecastTemp + offset;

    return {
      month,
      avgTemp: Math.round(baseTemp * 10) / 10,
      minTemp: Math.round((baseTemp - 5) * 10) / 10,
      maxTemp: Math.round((baseTemp + 5) * 10) / 10,
      rainfall: Math.round(avgRain * 24 * 30 * rainVariation[idx] * 10) / 10,
      humidity: Math.round(avgHumidity * (0.8 + Math.random() * 0.4)),
    };
  });
}

// Generate demo data for when API key is not available
export function generateDemoData(): {
  current: CurrentWeatherData;
  forecast: ForecastItem[];
} {
  const now = Date.now() / 1000;
  const current: CurrentWeatherData = {
    temp: 24,
    feels_like: 26,
    humidity: 65,
    pressure: 1013,
    wind_speed: 3.5,
    description: "scattered clouds",
    icon: "03d",
    city: "London",
    country: "GB",
    dt: now,
    temp_min: 20,
    temp_max: 28,
    visibility: 10000,
  };

  const forecast: ForecastItem[] = [];
  for (let i = 0; i < 40; i++) {
    const hourOffset = i * 3;
    const date = new Date(Date.now() + hourOffset * 3600 * 1000);
    const baseTemp = 22 + Math.sin((i / 8) * Math.PI) * 6 + (Math.random() - 0.5) * 3;
    forecast.push({
      dt: now + hourOffset * 3600,
      temp: Math.round(baseTemp * 10) / 10,
      temp_min: Math.round((baseTemp - 2) * 10) / 10,
      temp_max: Math.round((baseTemp + 2) * 10) / 10,
      humidity: Math.round(55 + Math.random() * 30),
      description: i % 5 === 0 ? "light rain" : i % 3 === 0 ? "few clouds" : "clear sky",
      icon: i % 5 === 0 ? "10d" : i % 3 === 0 ? "02d" : "01d",
      wind_speed: Math.round((2 + Math.random() * 5) * 10) / 10,
      rain: i % 5 === 0 ? Math.round(Math.random() * 3 * 10) / 10 : 0,
      date: format(date, "MMM dd"),
      time: format(date, "HH:mm"),
    });
  }

  return { current, forecast };
}