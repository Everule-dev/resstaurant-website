import { useState } from "react";
import { Search, Eye, Phone, MessageCircle, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const orders = [
    {
      id: "ORD-048",
      customer: "John Doe",
      phone: "+1 555-1234",
      items: ["Ribeye Steak", "Tiramisu"],
      total: 45.99,
      status: "pending",
      type: "delivery",
      address: "123 Main St, Apt 4B",
      time: "5 min ago",
    },
    {
      id: "ORD-047",
      customer: "Sarah Miller",
      phone: "+1 555-5678",
      items: ["Spaghetti Carbonara", "Mango Smoothie"],
      total: 28.50,
      status: "preparing",
      type: "pickup",
      address: "",
      time: "12 min ago",
    },
    {
      id: "ORD-046",
      customer: "Mike Ross",
      phone: "+1 555-9012",
      items: ["BBQ Baby Back Ribs", "Loaded Nachos", "Classic Mojito"],
      total: 67.25,
      status: "ready",
      type: "delivery",
      address: "456 Oak Ave",
      time: "25 min ago",
    },
    {
      id: "ORD-045",
      customer: "Emily Chen",
      phone: "+1 555-3456",
      items: ["Grilled Salmon"],
      total: 26.99,
      status: "delivered",
      type: "delivery",
      address: "789 Pine Rd",
      time: "45 min ago",
    },
    {
      id: "ORD-044",
      customer: "David Lee",
      phone: "+1 555-7890",
      items: ["Chicken Alfredo", "New York Cheesecake", "Fresh Orange Juice"],
      total: 32.97,
      status: "delivered",
      type: "pickup",
      address: "",
      time: "1 hr ago",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Order updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all orders</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Manual Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Add Manual Order</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm">
              Create an order from phone or WhatsApp requests.
            </p>
            <div className="py-4 text-center text-muted-foreground">
              Manual order form would go here
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">{order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                    <Badge variant="outline">{order.type}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Customer: </span>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone: </span>
                      <span>{order.phone}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-muted-foreground">Items: </span>
                      <span>{order.items.join(", ")}</span>
                    </div>
                    {order.address && (
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Address: </span>
                        <span>{order.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <a href={`tel:${order.phone}`}>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="text-green-600">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>

                  {order.status !== "delivered" && order.status !== "cancelled" && (
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderManagement;
