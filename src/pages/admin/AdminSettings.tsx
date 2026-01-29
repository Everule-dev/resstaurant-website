import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your restaurant settings</p>
      </div>

      {/* Restaurant Info */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Restaurant Information</CardTitle>
          <CardDescription>Basic details about your restaurant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Restaurant Name</Label>
              <Input defaultValue="Savoria" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="hello@savoria.com" />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input defaultValue="www.savoria.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input defaultValue="123 Gourmet Street, Foodie District, NY 10001" />
          </div>
        </CardContent>
      </Card>

      {/* Order Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Order Settings</CardTitle>
          <CardDescription>Configure your order preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Accept Online Orders</Label>
              <p className="text-sm text-muted-foreground">
                Allow customers to place orders online
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Delivery</Label>
              <p className="text-sm text-muted-foreground">
                Offer delivery service to customers
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Pickup</Label>
              <p className="text-sm text-muted-foreground">
                Allow customers to pick up their orders
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Order Amount ($)</Label>
              <Input type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label>Delivery Fee ($)</Label>
              <Input type="number" defaultValue="3.99" />
            </div>
            <div className="space-y-2">
              <Label>Free Delivery Threshold ($)</Label>
              <Input type="number" defaultValue="25" />
            </div>
            <div className="space-y-2">
              <Label>Estimated Delivery Time (min)</Label>
              <Input type="number" defaultValue="30" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Notifications</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Order Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new orders
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Reservation Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of new table reservations
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert when menu items run low
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
