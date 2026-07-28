import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { DailyForecast } from "@/types/weather";

interface RainfallChartProps {
  data: DailyForecast[];
}

export function RainfallChart({ data }: RainfallChartProps) {
  const chartData = data.map((day) => ({
    date: day.date,
    day: day.dayName.slice(0, 3),
    rainfall: day.rain_total,
    humidity: day.humidity_avg,
  }));

  const maxRain = Math.max(...chartData.map((d) => d.rainfall));

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Rainfall Analysis</h3>
          <p className="text-sm text-slate-400">Daily precipitation forecast</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-cyan-400">
            {data.reduce((sum, d) => sum + d.rain_total, 0).toFixed(1)} mm
          </p>
          <p className="text-xs text-slate-400">Total expected</p>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              unit=" mm"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(value: number) => [`${value} mm`, "Rainfall"]}
            />
            <Bar dataKey="rainfall" radius={[6, 6, 0, 0]} name="Rainfall">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.rainfall === maxRain
                      ? "#06b6d4"
                      : entry.rainfall > 0
                        ? "#0891b2"
                        : "#334155"
                  }
                  opacity={entry.rainfall > 0 ? 0.8 + (entry.rainfall / maxRain) * 0.2 : 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {data.map((day) => (
          <div key={day.date} className="text-center">
            <p className="text-xs text-slate-500">{day.dayName.slice(0, 3)}</p>
            <p className="text-xs text-slate-300">{day.humidity_avg}%</p>
            <p className="text-[10px] text-slate-500">humidity</p>
          </div>
        ))}
      </div>
    </div>
  );
}