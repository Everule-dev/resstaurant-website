import { useState } from "react";
import { Search, Mail, Phone, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@email.com",
      phone: "+1 555-1234",
      orders: 12,
      totalSpent: 456.78,
      joinedDate: "2023-10-15",
      lastOrder: "2024-01-20",
    },
    {
      id: "2",
      name: "Sarah Miller",
      email: "sarah@email.com",
      phone: "+1 555-5678",
      orders: 8,
      totalSpent: 234.50,
      joinedDate: "2023-11-20",
      lastOrder: "2024-01-18",
    },
    {
      id: "3",
      name: "Mike Ross",
      email: "mike@email.com",
      phone: "+1 555-9012",
      orders: 25,
      totalSpent: 892.25,
      joinedDate: "2023-08-05",
      lastOrder: "2024-01-15",
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emily@email.com",
      phone: "+1 555-3456",
      orders: 5,
      totalSpent: 156.99,
      joinedDate: "2024-01-01",
      lastOrder: "2024-01-12",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david@email.com",
      phone: "+1 555-7890",
      orders: 18,
      totalSpent: 567.80,
      joinedDate: "2023-09-10",
      lastOrder: "2024-01-10",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">User Management</h1>
        <p className="text-muted-foreground">View and manage registered customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.orders > 10).length}
            </p>
            <p className="text-sm text-muted-foreground">Loyal Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              ${users.reduce((acc, u) => acc + u.totalSpent, 0).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">
              {(users.reduce((acc, u) => acc + u.orders, 0) / users.length).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">Avg Orders/User</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Last order: {user.lastOrder}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        user.orders > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {user.orders}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${user.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(user.joinedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
