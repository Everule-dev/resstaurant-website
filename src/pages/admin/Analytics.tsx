import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const salesData = [
    { name: "Mon", sales: 1200 },
    { name: "Tue", sales: 1800 },
    { name: "Wed", sales: 1400 },
    { name: "Thu", sales: 2100 },
    { name: "Fri", sales: 2800 },
    { name: "Sat", sales: 3200 },
    { name: "Sun", sales: 2600 },
  ];

  const ordersByCategory = [
    { name: "Main Course", orders: 145 },
    { name: "Appetizers", orders: 98 },
    { name: "Grills", orders: 87 },
    { name: "Seafood", orders: 65 },
    { name: "Desserts", orders: 54 },
    { name: "Drinks", orders: 120 },
  ];

  const orderTypeData = [
    { name: "Delivery", value: 60 },
    { name: "Pickup", value: 25 },
    { name: "Dine-in", value: 15 },
  ];

  const COLORS = ["hsl(24, 95%, 53%)", "hsl(0, 72%, 51%)", "hsl(45, 100%, 50%)"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Analytics</h1>
        <p className="text-muted-foreground">Sales overview and trends</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">$15,100</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">+18%</p>
            <p className="text-sm text-muted-foreground">vs Last Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">569</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">$26.54</p>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Weekly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => [`$${value}`, "Sales"]}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(24, 95%, 53%)"
                  fill="hsl(24, 95%, 53%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(24, 95%, 53%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Order Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {orderTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Items */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Most Popular Items This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Ribeye Steak", orders: 45, revenue: 1574.55 },
              { name: "BBQ Baby Back Ribs", orders: 38, revenue: 1101.62 },
              { name: "Spaghetti Carbonara", orders: 35, revenue: 664.65 },
              { name: "Grilled Salmon", orders: 32, revenue: 863.68 },
              { name: "Chocolate Lava Cake", orders: 28, revenue: 279.72 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-8">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <span className="font-bold text-primary">
                  ${item.revenue.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
