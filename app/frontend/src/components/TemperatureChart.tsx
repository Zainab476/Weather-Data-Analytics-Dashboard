import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import type { ForecastItem } from "@/types/weather";

interface TemperatureChartProps {
  data: ForecastItem[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartData = data.map((item) => ({
    time: `${item.date} ${item.time}`,
    label: item.time,
    temp: item.temp,
    min: item.temp_min,
    max: item.temp_max,
    feels: item.temp,
  }));

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Temperature Trends</h3>
          <p className="text-sm text-slate-400">5-day hourly forecast</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-cyan-400 rounded" />
            <span className="text-slate-400">Temp</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-red-400 rounded" />
            <span className="text-slate-400">Max</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-blue-400 rounded" />
            <span className="text-slate-400">Min</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              interval={7}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              unit="°"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#tempGradient)"
              name="Temperature"
              unit="°C"
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#f87171"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              name="Max"
              unit="°C"
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#60a5fa"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              name="Min"
              unit="°C"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}