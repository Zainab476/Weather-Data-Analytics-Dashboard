export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface CurrentWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  dt: number;
  temp_min: number;
  temp_max: number;
  visibility: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  rain: number;
  date: string;
  time: string;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  temp_avg: number;
  temp_min: number;
  temp_max: number;
  humidity_avg: number;
  rain_total: number;
  description: string;
  icon: string;
  wind_avg: number;
}

export interface MonthlyData {
  month: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  rainfall: number;
  humidity: number;
}

export interface AnalyticsMetrics {
  avgTemperature: number;
  hottestDay: { date: string; temp: number };
  coldestDay: { date: string; temp: number };
  totalRainfall: number;
  avgHumidity: number;
  avgWindSpeed: number;
}