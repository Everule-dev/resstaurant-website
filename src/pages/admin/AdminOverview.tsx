import { DollarSign, Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPopularItems } from "@/data/menuData";

const AdminOverview = () => {
  const popularItems = getPopularItems().slice(0, 5);

  const stats = [
    {
      title: "Today's Revenue",
      value: "$1,234",
      change: "+12%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "48",
      change: "+8%",
      isPositive: true,
      icon: Package,
    },
    {
      title: "New Customers",
      value: "12",
      change: "+23%",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Avg Order Value",
      value: "$25.70",
      change: "-3%",
      isPositive: false,
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    { id: "ORD-048", customer: "John D.", total: 45.99, status: "preparing", time: "5 min ago" },
    { id: "ORD-047", customer: "Sarah M.", total: 28.50, status: "ready", time: "12 min ago" },
    { id: "ORD-046", customer: "Mike R.", total: 67.25, status: "delivered", time: "25 min ago" },
    { id: "ORD-045", customer: "Emily C.", total: 32.00, status: "delivered", time: "45 min ago" },
    { id: "ORD-044", customer: "David L.", total: 89.99, status: "delivered", time: "1 hr ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  className={
                    stat.isPositive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-4">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-2 border-b last:border-0"
                >
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">
                    {Math.floor(Math.random() * 50 + 20)} sold
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New order received", detail: "ORD-048 from John D.", time: "5 min ago" },
              { action: "Order completed", detail: "ORD-046 delivered successfully", time: "25 min ago" },
              { action: "New reservation", detail: "Table for 4 on Jan 25, 7:00 PM", time: "1 hr ago" },
              { action: "Menu item updated", detail: "Ribeye Steak price changed", time: "2 hrs ago" },
              { action: "New customer registered", detail: "welcome@email.com", time: "3 hrs ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 py-2 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
