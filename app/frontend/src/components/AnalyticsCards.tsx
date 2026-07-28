import { TrendingUp, TrendingDown, CloudRain, Droplets, Wind, Thermometer } from "lucide-react";
import type { AnalyticsMetrics } from "@/types/weather";

interface AnalyticsCardsProps {
  metrics: AnalyticsMetrics;
}

export function AnalyticsCards({ metrics }: AnalyticsCardsProps) {
  const cards = [
    {
      title: "Average Temperature",
      value: `${metrics.avgTemperature}°C`,
      icon: Thermometer,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
    },
    {
      title: "Hottest Day",
      value: `${metrics.hottestDay.temp}°C`,
      subtitle: metrics.hottestDay.date,
      icon: TrendingUp,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
    },
    {
      title: "Coldest Day",
      value: `${metrics.coldestDay.temp}°C`,
      subtitle: metrics.coldestDay.date,
      icon: TrendingDown,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      title: "Total Rainfall",
      value: `${metrics.totalRainfall} mm`,
      icon: CloudRain,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/20",
    },
    {
      title: "Avg Humidity",
      value: `${metrics.avgHumidity}%`,
      icon: Droplets,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
    {
      title: "Avg Wind Speed",
      value: `${metrics.avgWindSpeed} m/s`,
      icon: Wind,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bgColor} border ${card.borderColor} rounded-xl p-4 backdrop-blur-sm`}
        >
          <div className="flex items-center gap-2 mb-2">
            <card.icon className={`w-4 h-4 ${card.color}`} />
            <span className="text-xs text-slate-400 truncate">{card.title}</span>
          </div>
          <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
          {card.subtitle && (
            <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}