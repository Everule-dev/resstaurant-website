import { Link } from "react-router-dom";
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserReservations = () => {
  // Mock reservations
  const reservations = [
    {
      id: "RES-001",
      date: "2024-01-25",
      time: "7:00 PM",
      guests: 4,
      status: "confirmed",
      specialRequests: "Birthday celebration - please prepare a small cake",
    },
    {
      id: "RES-002",
      date: "2024-01-15",
      time: "8:30 PM",
      guests: 2,
      status: "completed",
      specialRequests: "",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">My Reservations</h1>
          <p className="text-muted-foreground">View and manage your table reservations</p>
        </div>
        <Link to="/reservation">
          <Button className="bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
        </Link>
      </div>

      {reservations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No reservations</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any upcoming reservations
            </p>
            <Link to="/reservation">
              <Button className="bg-primary hover:bg-primary/90">
                Book a Table
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {reservation.id}
                  </CardTitle>
                  <Badge className={getStatusColor(reservation.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(reservation.status)}
                      <span className="capitalize">{reservation.status}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(reservation.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{reservation.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{reservation.guests} guests</span>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Special Requests:</strong> {reservation.specialRequests}
                    </p>
                  </div>
                )}

                {reservation.status === "confirmed" && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive border-destructive hover:bg-destructive/10"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReservations;
