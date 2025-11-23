export default function WeatherMetric({ label, value, unit, icon }) {
  return (
    <div className="flex items-center space-x-2" role="group" aria-label={label}>
      {icon && <span className="text-2xl" aria-hidden="true">{icon}</span>}
      <span className="font-medium">{label}:</span>
      <span className="ml-1">{value ?? "-"}{unit}</span>
    </div>
  );
}
