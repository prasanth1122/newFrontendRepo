import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeriodicals } from "../store/redux/slices/periodicalSlice.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import StoreCard from "../components/storeCard/storeCard.jsx";
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import { FaSearch } from "react-icons/fa";

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { periodicals, loading } = useSelector((state) => state.periodicals);

  const { isSidebarOpen } = useGlobalContext();

  useEffect(() => {
    dispatch(fetchPeriodicals());
  }, [dispatch]);

  const currentMonth = new Date().getMonth() + 1; // Current month (1-based index)
  const currentYear = new Date().getFullYear(); // Current year

  if (loading) return <LoadingComponent />;

  const periodicalsData = periodicals?.data || [];

  // Filter periodicals based on the search term
  const filteredPeriodicals = periodicalsData.filter((periodical) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      periodical.title.toLowerCase().includes(searchLower) ||
      periodical.category.toLowerCase().includes(searchLower) ||
      periodical.month.toString().includes(searchLower) ||
      periodical.year.toString().includes(searchLower)
    );
  });

  // Group periodicals by month and year
  const groupedPeriodicals = Array.from({ length: 12 }, (_, i) => {
    const month = ((currentMonth - i + 11) % 12) + 1; // Wrap-around for months
    const year = currentYear - (month > currentMonth ? 1 : 0); // Adjust year for wrapped months

    return {
      month,
      year,
      periodicals: filteredPeriodicals.filter(
        (p) => p.month === month && p.year === year
      ),
    };
  });

  return (
    <section className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth flex flex-col items-center mt-20 py-8">
        {/* Search Bar */}
        <div className="w-full flex items-center justify-center gap-4">
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search by title, category, month, or year..."
              className="p-2 w-full border border-gray-300 rounded pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Periodicals by Month */}
        <div className="w-full flex flex-col gap-8 mt-8">
          {groupedPeriodicals.map(({ month, year, periodicals }) => {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            return (
              <div
                key={`${month}-${year}`}
                className="w-full p-4 bg-highlight_background rounded-xl"
              >
                <h2 className="text-2xl text-important_text font-bold mb-4">
                  {monthNames[month - 1]} {year}
                </h2>
                {periodicals.length > 0 ? (
                  <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {periodicals.map((periodical) => (
                      <StoreCard
                        key={periodical._id}
                        id={periodical._id}
                        title={periodical.title}
                        category={periodical.category}
                        month={periodical.month}
                        year={periodical.year}
                        views={periodical.views}
                        subscription={periodical.subscription}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No periodicals available this month.</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </section>
  );
}
