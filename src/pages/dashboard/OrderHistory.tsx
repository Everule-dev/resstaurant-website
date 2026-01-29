import { Package, Clock, CheckCircle, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderHistory = () => {
  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["Ribeye Steak", "Tiramisu", "Fresh Orange Juice"],
      total: 49.97,
      status: "delivered",
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      items: ["Spaghetti Carbonara", "Chocolate Lava Cake"],
      total: 28.98,
      status: "delivered",
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      items: ["Grilled Salmon", "Mango Smoothie"],
      total: 33.98,
      status: "delivered",
    },
    {
      id: "ORD-004",
      date: "2024-01-20",
      items: ["BBQ Baby Back Ribs", "Loaded Nachos"],
      total: 43.98,
      status: "preparing",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "preparing":
        return <Package className="h-4 w-4" />;
      case "on-the-way":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "on-the-way":
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
        <h1 className="text-2xl font-display font-bold">Order History</h1>
        <p className="text-muted-foreground">Track and view your past orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet. Start ordering delicious food!
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {order.id}
                  </CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">
                      ${order.total.toFixed(2)}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === "delivered" && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
