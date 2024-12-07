import { FaCaretDown } from "react-icons/fa6";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";

import { useGlobalContext } from "../store/context/globalContext.jsx";
import StatisticsCircletwo from "../components/statisticsCircle/circle2.jsx";
import StatisticsCircle from "../components/statisticsCircle/statisticsCircle.jsx";
import { useState } from "react";
export default function AnalyticsPage() {
  // State for selected time period
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Circle data for each period
  const periodData = {
    "This Month": { hoursSpent: 60, dailyAverage: 2.8 },
    "Last Month": { hoursSpent: 50, dailyAverage: 2.5 },
    "Last 3 Months": { hoursSpent: 160, dailyAverage: 3.0 },
    "This Year": { hoursSpent: 600, dailyAverage: 3.2 },
  };

  const handleSelectChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const { hoursSpent, dailyAverage } = periodData[selectedPeriod];
  const { isSidebarOpen } = useGlobalContext();
  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar included here */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      {/* Main Content */}
      <main className="w-mainWidth h-full mt-20 rounded-xl flex flex-col items-center gap-4 ">
        <div className="w-full h-full flex flex-col mt-2 mb-4  items-start gap-8  rounded-xl p-4 overflow-y-auto  ">
          {/* Header with user name and time period selection */}
          <div className="flex items-center  md:gap-16 bg-white w-full p-4 rounded-lg">
            <p className="text-lg md:text-2xl text-important_text">
              Vishal Gupta Analytics
            </p>

            {/* Dropdown for selecting time period */}
            <div className="w-40 relative  flex items-center gap-4 border-2 border-secondary rounded-xl bg-white">
              <select
                value={selectedPeriod}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 rounded-xl appearance-none border-none text-lg focus:outline-none  leading-none"
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
              </select>
              <FaCaretDown
                style={{ fill: "#FF5E5B", width: "20px", height: "20px" }}
                className="absolute right-4 pointer-events-none"
              />
            </div>
          </div>

          {/* Rest of the content */}
          <div className="w-full gap-20 flex flex-col items-start flex-wrap xl:gap:36 xl:flex-row xl:items-center rounded-xl py-16 bg-terinary">
            <div className="flex items-center gap-8 px-2 md:px-0">
              <StatisticsCircle hoursSpent={hoursSpent} totalHours={168} />
              <div className="flex flex-col items-start">
                <p className="text-2xl text-important_text">
                  {hoursSpent} Hours
                </p>
                <p className="text-lg">
                  Total time spent {selectedPeriod.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 md:px-4">
              <StatisticsCircletwo hoursSpent={dailyAverage} totalHours={24} />
              <div className="flex flex-col items-start">
                <p className="text-2xl text-important_text">
                  {dailyAverage} Hours
                </p>
                <p className="text-lg">Daily Average</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 bg-white w-full py-4 rounded-xl px-2">
            <p>Rankings Coming soon</p>
          </div>
        </div>
      </main>
    </section>
  );
}
