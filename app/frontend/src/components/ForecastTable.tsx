import type { DailyForecast } from "@/types/weather";

interface ForecastTableProps {
  data: DailyForecast[];
}

export function ForecastTable({ data }: ForecastTableProps) {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">5-Day Forecast</h3>
        <p className="text-sm text-slate-400">Detailed daily breakdown</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-xs font-medium text-slate-400 pb-3 pr-4">
                Day
              </th>
              <th className="text-left text-xs font-medium text-slate-400 pb-3 pr-4">
                Condition
              </th>
              <th className="text-center text-xs font-medium text-slate-400 pb-3 pr-4">
                Temp (°C)
              </th>
              <th className="text-center text-xs font-medium text-slate-400 pb-3 pr-4">
                Min / Max
              </th>
              <th className="text-center text-xs font-medium text-slate-400 pb-3 pr-4">
                Humidity
              </th>
              <th className="text-center text-xs font-medium text-slate-400 pb-3 pr-4">
                Wind
              </th>
              <th className="text-center text-xs font-medium text-slate-400 pb-3">
                Rain
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((day, index) => (
              <tr
                key={day.date}
                className={`border-b border-slate-700/50 ${
                  index % 2 === 0 ? "bg-slate-800/30" : ""
                }`}
              >
                <td className="py-3 pr-4">
                  <div>
                    <p className="text-sm font-medium text-white">{day.dayName}</p>
                    <p className="text-xs text-slate-500">{day.date}</p>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                      alt={day.description}
                      className="w-8 h-8"
                    />
                    <span className="text-sm text-slate-300 capitalize">
                      {day.description}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-center">
                  <span className="text-sm font-semibold text-white">
                    {day.temp_avg}°
                  </span>
                </td>
                <td className="py-3 pr-4 text-center">
                  <span className="text-xs text-blue-400">{day.temp_min}°</span>
                  <span className="text-xs text-slate-500 mx-1">/</span>
                  <span className="text-xs text-red-400">{day.temp_max}°</span>
                </td>
                <td className="py-3 pr-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div
                      className="h-1.5 rounded-full bg-blue-400/30"
                      style={{ width: "40px" }}
                    >
                      <div
                        className="h-full rounded-full bg-blue-400"
                        style={{ width: `${day.humidity_avg}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-300">{day.humidity_avg}%</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-center">
                  <span className="text-sm text-slate-300">{day.wind_avg} m/s</span>
                </td>
                <td className="py-3 text-center">
                  <span
                    className={`text-sm font-medium ${
                      day.rain_total > 0 ? "text-cyan-400" : "text-slate-500"
                    }`}
                  >
                    {day.rain_total > 0 ? `${day.rain_total} mm` : "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}