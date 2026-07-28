import { Cloud, Droplets, Eye, Gauge, Thermometer, Wind } from "lucide-react";
import type { CurrentWeatherData } from "@/types/weather";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {data.city}, {data.country}
          </h2>
          <p className="text-slate-400 capitalize">{data.description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-20 h-20"
        />
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-6xl font-bold text-white">{data.temp}°</span>
        <span className="text-slate-400 text-lg mb-2">C</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <div>
            <p className="text-xs text-slate-400">Feels Like</p>
            <p className="text-sm font-medium text-white">{data.feels_like}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Droplets className="w-4 h-4 text-blue-400" />
          <div>
            <p className="text-xs text-slate-400">Humidity</p>
            <p className="text-sm font-medium text-white">{data.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Wind className="w-4 h-4 text-cyan-400" />
          <div>
            <p className="text-xs text-slate-400">Wind</p>
            <p className="text-sm font-medium text-white">{data.wind_speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Gauge className="w-4 h-4 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400">Pressure</p>
            <p className="text-sm font-medium text-white">{data.pressure} hPa</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Eye className="w-4 h-4 text-green-400" />
          <div>
            <p className="text-xs text-slate-400">Visibility</p>
            <p className="text-sm font-medium text-white">
              {(data.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
          <Cloud className="w-4 h-4 text-slate-300" />
          <div>
            <p className="text-xs text-slate-400">Min / Max</p>
            <p className="text-sm font-medium text-white">
              {data.temp_min}° / {data.temp_max}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}