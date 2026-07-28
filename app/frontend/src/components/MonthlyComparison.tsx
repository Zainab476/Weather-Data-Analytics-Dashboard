import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import type { MonthlyData } from "@/types/weather";

interface MonthlyComparisonProps {
  data: MonthlyData[];
}

export function MonthlyComparison({ data }: MonthlyComparisonProps) {
  const currentMonth = new Date().getMonth();

  const hottestMonth = data.reduce((max, m) =>
    m.avgTemp > max.avgTemp ? m : max
  );
  const coldestMonth = data.reduce((min, m) =>
    m.avgTemp < min.avgTemp ? m : min
  );
  const rainiestMonth = data.reduce((max, m) =>
    m.rainfall > max.rainfall ? m : max
  );

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Monthly Comparison</h3>
          <p className="text-sm text-slate-400">
            Annual temperature & rainfall analysis
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="text-center">
            <p className="text-red-400 font-semibold">{hottestMonth.month}</p>
            <p className="text-slate-500">Hottest</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 font-semibold">{coldestMonth.month}</p>
            <p className="text-slate-500">Coldest</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-semibold">{rainiestMonth.month}</p>
            <p className="text-slate-500">Rainiest</p>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              yAxisId="temp"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              unit="°"
            />
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              unit="mm"
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
            <Legend
              wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }}
            />
            <Bar
              yAxisId="rain"
              dataKey="rainfall"
              fill="#06b6d4"
              opacity={0.4}
              radius={[4, 4, 0, 0]}
              name="Rainfall (mm)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="avgTemp"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: "#f97316", r: 3 }}
              name="Avg Temp (°C)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="maxTemp"
              stroke="#ef4444"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              name="Max Temp (°C)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="minTemp"
              stroke="#3b82f6"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              name="Min Temp (°C)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
        <p className="text-xs text-slate-400">
          <span className="text-slate-300 font-medium">Note:</span> Monthly data is
          projected based on current forecast trends and historical climate patterns.
          Actual values may vary.
        </p>
      </div>
    </div>
  );
}