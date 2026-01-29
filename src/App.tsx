import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Location from "./pages/Location";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import UserDashboard from "./pages/dashboard/UserDashboard";
import OrderHistory from "./pages/dashboard/OrderHistory";
import SavedAddresses from "./pages/dashboard/SavedAddresses";
import ProfileSettings from "./pages/dashboard/ProfileSettings";
import Favorites from "./pages/dashboard/Favorites";
import UserReservations from "./pages/dashboard/UserReservations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import MenuManagement from "./pages/admin/MenuManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import ReservationManagement from "./pages/admin/ReservationManagement";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout with Navbar and Footer for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
    <CartDrawer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
              <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/location" element={<PublicLayout><Location /></PublicLayout>} />
              <Route path="/reservation" element={<PublicLayout><Reservation /></PublicLayout>} />
              <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
              
              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* User Dashboard */}
              <Route path="/dashboard" element={<PublicLayout><UserDashboard /></PublicLayout>}>
                <Route index element={<OrderHistory />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="addresses" element={<SavedAddresses />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="reservations" element={<UserReservations />} />
              </Route>
              
              {/* Admin Dashboard */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminOverview />} />
                <Route path="menu" element={<MenuManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="reservations" element={<ReservationManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
