const StatisticsCircle = ({ hoursSpent, totalHours }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (hoursSpent / totalHours) * circumference;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <svg width="180" height="180" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="white"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#FF5E5B"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-500"
          />
        </svg>
        {/* Text Inside the Circle */}
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default StatisticsCircle;
