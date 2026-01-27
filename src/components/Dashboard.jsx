import StatCard from "../components/StatCard";
import DashboardLayout from "../components/layout/DashboardLayout";
// import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="bg-blue-50 min-h-screen p-4 sm:p-6">
        {/* Topbar */}
        {/* <Topbar /> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Books" value="51,764" icon="📚" />
          <StatCard title="Available Books" value="51,009" icon="✅" />
          <StatCard title="Borrowed Books" value="1,009" icon="📖" />
          <StatCard title="Registered Users" value="1,004" icon="👤" />
          <StatCard title="Unavailable Books" value="59" icon="❌" />
        </div>

        {/* Placeholder for future charts or content */}
        <div className="space-y-6">
           {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* RECENT TRANSACTIONS */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-3">
              Recent Transactions
            </h3>
            <ul className="text-sm space-y-2">
              <li>Adetola borrowed 2 books today</li>
              <li>10 books added to medicine section</li>
              <li>Tolani returned 2 books today</li>
              <li>Demilade is overdue by 1 week</li>
            </ul>
          </div>

          {/* LIBRARY STATS */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-3">
              Library Statistics
            </h3>

            <div className="space-y-3 text-sm">
              <p>
                Monthly Circulation:{" "}
                <span className="font-bold">5432 Books</span>
              </p>
              <p>
                New Books:{" "}
                <span className="font-bold">235</span>
              </p>
              <p>
                Returns:{" "}
                <span className="font-bold">150</span>
              </p>
            </div>
          </div>

          {/* ALERTS */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-3">
              Alerts & Notifications
            </h3>

            <ul className="text-sm space-y-2">
              <li className="text-red-500">
                🔴 50 books are overdue
              </li>
              <li>📘 382 books were returned</li>
              <li>✅ 51,000 books are available</li>
              <li>⚠ Low stock in fiction section</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
