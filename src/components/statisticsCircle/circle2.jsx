const StatisticsCircletwo = ({ hoursSpent, totalHours }) => {
  const radius = 50; // Slightly increased radius for a larger circle
  const circumference = 2 * Math.PI * radius;
  const progress = (hoursSpent / totalHours) * circumference;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <svg width="120" height="120" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="white"
            strokeWidth="8" // Slightly increased stroke width
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#FF5E5B"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default StatisticsCircletwo;
