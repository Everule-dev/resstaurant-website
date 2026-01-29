import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  guests: z.string({ required_error: "Please select party size" }),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const Reservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationFormData | null>(null);
  const { toast } = useToast();

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  const onSubmit = (data: ReservationFormData) => {
    // Mock submission - in production, this would call an API
    setReservationDetails(data);
    setIsSubmitted(true);
    toast({
      title: "Reservation Confirmed!",
      description: "We've sent a confirmation to your email.",
    });
  };

  if (isSubmitted && reservationDetails) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="pt-10 pb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Reservation Confirmed!
              </h1>
              <p className="text-muted-foreground mb-8">
                We're looking forward to seeing you at Savoria
              </p>

              <div className="bg-secondary rounded-lg p-6 text-left space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{reservationDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {format(reservationDetails.date, "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{reservationDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Party Size</span>
                  <span className="font-medium">{reservationDetails.guests} guests</span>
                </div>
                {reservationDetails.specialRequests && (
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground text-sm">Special Requests:</span>
                    <p className="font-medium mt-1">{reservationDetails.specialRequests}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                A confirmation email has been sent to {reservationDetails.email}
              </p>

              <Button
                className="mt-6 bg-primary hover:bg-primary/90"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Make Another Reservation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium">Reserve Your Table</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mt-2">
            Book a Table
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table
            now and let us take care of the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Reservation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                }
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time">
                                  {field.value && (
                                    <span className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      {field.value}
                                    </span>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover">
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Party Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Number of guests">
                                {field.value && (
                                  <span className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {field.value} {parseInt(field.value) === 1 ? "guest" : "guests"}
                                  </span>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover">
                            {guestOptions.map((num) => (
                              <SelectItem key={num} value={num}>
                                {num} {num === "1" ? "guest" : "guests"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Dietary restrictions, celebrations, seating preferences..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Confirm Reservation
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=300&fit=crop"
                  alt="Restaurant ambiance"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="font-display font-bold text-lg mb-2">
                  What to Expect
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Elegant dining atmosphere with warm ambiance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Complimentary bread basket upon arrival
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Extensive wine selection by our sommelier
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Vegetarian and vegan options available
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-lg mb-2">
                  Cancellation Policy
                </h3>
                <p className="text-muted-foreground text-sm">
                  We kindly ask for at least 24 hours notice for cancellations.
                  For parties of 6 or more, please call us directly to make your
                  reservation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-lg mb-4">
                  Need Help?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For immediate assistance or large party bookings, please
                  contact us directly:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+15551234567" className="text-primary hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:reservations@savoria.com" className="text-primary hover:underline">
                      reservations@savoria.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
