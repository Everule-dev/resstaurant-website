import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Truck, Store, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  orderType: z.enum(["delivery", "pickup"]),
  address: z.string().optional(),
  instructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", phone: "", orderType: "delivery", address: "", instructions: "" },
  });

  const orderType = form.watch("orderType");

  const onSubmit = (data: CheckoutFormData) => {
    toast({ title: "Order placed!", description: "Your order has been confirmed." });
    setIsSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !isSubmitted) {
    navigate("/menu");
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <Card>
            <CardContent className="pt-10 pb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-6">Thank you for your order. We'll prepare it right away!</p>
              <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">Back to Home</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle className="font-display">Order Details</CardTitle></CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="orderType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Type</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2 p-4 border rounded-lg flex-1 cursor-pointer hover:bg-muted">
                              <RadioGroupItem value="delivery" id="delivery" /><Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer"><Truck className="h-4 w-4" />Delivery</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-4 border rounded-lg flex-1 cursor-pointer hover:bg-muted">
                              <RadioGroupItem value="pickup" id="pickup" /><Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer"><Store className="h-4 w-4" />Pickup</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )} />
                    {orderType === "delivery" && (
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Delivery Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    )}
                    <FormField control={form.control} name="instructions" render={({ field }) => (
                      <FormItem><FormLabel>Special Instructions (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
                    )} />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />Place Order - ${getTotal().toFixed(2)}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-24">
              <CardHeader><CardTitle className="font-display">Order Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span><span className="text-primary">${getTotal().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
