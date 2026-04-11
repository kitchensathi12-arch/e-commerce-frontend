import {
  DollarSign,
  ShoppingCart,
  Users,
  PackageCheck,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/* ===========================
   DATA
=========================== */

const stats = [
  {
    title: "Total Revenue",
    value: "₹8,26,500",
    icon: DollarSign,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Total Orders",
    value: "1,645",
    icon: ShoppingCart,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Active Customers",
    value: "1,462",
    icon: Users,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Delivered Orders",
    value: "1,528",
    icon: PackageCheck,
    color: "bg-rose-100 text-rose-600",
  },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 150000 },
  { month: "Mar", revenue: 180000 },
  { month: "Apr", revenue: 210000 },
  { month: "May", revenue: 195000 },
  { month: "Jun", revenue: 230000 },
];

const categorySales = [
  { name: "Mixer Grinder", value: 35 },
  { name: "Microwave Oven", value: 25 },
  { name: "Induction Cooktop", value: 20 },
  { name: "Juicer", value: 20 },
];

const orderStatus = [
  { status: "Delivered", orders: 1528 },
  { status: "Pending", orders: 82 },
  { status: "Returned", orders: 35 },
];

const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444"];

/* ===========================
   COMPONENT
=========================== */

const Dashboard = () => {
  return (
    <div className="w-full space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    {item.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= REVENUE + CATEGORY ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Monthly Revenue
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="#d1fae5"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Sales by Category
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {categorySales.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-2 text-sm">
            {categorySales.map((item, index) => (
              <div key={item.name} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  {item.name}
                </span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ORDER STATUS ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Order Status Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatus}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Dashboard;