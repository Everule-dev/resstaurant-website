import { useState } from "react";
import { Calendar, Clock, Users, CheckCircle, XCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ReservationManagement = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const reservations = [
    {
      id: "RES-001",
      customer: "Alice Johnson",
      phone: "+1 555-1111",
      email: "alice@email.com",
      date: "2024-01-25",
      time: "7:00 PM",
      guests: 4,
      status: "pending",
      specialRequests: "Birthday celebration - need a cake",
    },
    {
      id: "RES-002",
      customer: "Bob Smith",
      phone: "+1 555-2222",
      email: "bob@email.com",
      date: "2024-01-25",
      time: "8:30 PM",
      guests: 2,
      status: "confirmed",
      specialRequests: "",
    },
    {
      id: "RES-003",
      customer: "Carol Davis",
      phone: "+1 555-3333",
      email: "carol@email.com",
      date: "2024-01-26",
      time: "6:00 PM",
      guests: 6,
      status: "confirmed",
      specialRequests: "Vegetarian menu options needed",
    },
    {
      id: "RES-004",
      customer: "Dan Wilson",
      phone: "+1 555-4444",
      email: "dan@email.com",
      date: "2024-01-24",
      time: "7:30 PM",
      guests: 3,
      status: "completed",
      specialRequests: "",
    },
    {
      id: "RES-005",
      customer: "Eve Brown",
      phone: "+1 555-5555",
      email: "eve@email.com",
      date: "2024-01-23",
      time: "8:00 PM",
      guests: 2,
      status: "cancelled",
      specialRequests: "",
    },
  ];

  const filteredReservations = reservations.filter((res) => {
    return statusFilter === "all" || res.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleConfirm = (id: string) => {
    toast({
      title: "Reservation confirmed",
      description: `Reservation ${id} has been confirmed.`,
    });
  };

  const handleCancel = (id: string) => {
    toast({
      title: "Reservation cancelled",
      description: `Reservation ${id} has been cancelled.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Reservation Management</h1>
          <p className="text-muted-foreground">Manage table reservations</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">
              {reservations.filter((r) => r.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {reservations.filter((r) => r.status === "confirmed").length}
            </p>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {reservations.filter((r) => r.date === "2024-01-25").length}
            </p>
            <p className="text-sm text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">
              {reservations.reduce((acc, r) => acc + r.guests, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Guests</p>
          </CardContent>
        </Card>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">{reservation.id}</span>
                    <Badge className={getStatusColor(reservation.status)}>
                      <span className="capitalize">{reservation.status}</span>
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Customer: </span>
                      <span className="font-medium">{reservation.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        {new Date(reservation.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{reservation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{reservation.guests} guests</span>
                    </div>
                  </div>
                  {reservation.specialRequests && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                      <span className="text-muted-foreground">Note: </span>
                      {reservation.specialRequests}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a href={`tel:${reservation.phone}`}>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </a>
                  {reservation.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleConfirm(reservation.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No reservations found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReservationManagement;
