import { useState } from "react";
import { MapPin, Plus, Edit, Trash2, Home, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  label: string;
  type: "home" | "work" | "other";
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

const SavedAddresses = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      type: "home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: "2",
      label: "Work",
      type: "work",
      address: "456 Business Ave, Suite 100",
      city: "New York, NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />;
      case "work":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast({
      title: "Default address updated",
      description: "Your default delivery address has been changed.",
    });
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast({
      title: "Address deleted",
      description: "The address has been removed from your saved addresses.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Saved Addresses</h1>
          <p className="text-muted-foreground">Manage your delivery addresses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Add New Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" placeholder="e.g., Home, Work, Mom's place" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main Street, Apt 4B" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York, NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="10001" />
                </div>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  toast({
                    title: "Address added",
                    description: "Your new address has been saved.",
                  });
                  setIsDialogOpen(false);
                }}
              >
                Save Address
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No saved addresses</h3>
            <p className="text-muted-foreground mb-4">
              Add an address for faster checkout
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {getTypeIcon(address.type)}
                    {address.label}
                  </CardTitle>
                  {address.isDefault && (
                    <Badge className="bg-primary/10 text-primary">Default</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-1">{address.address}</p>
                <p className="text-muted-foreground">
                  {address.city} {address.zipCode}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;
