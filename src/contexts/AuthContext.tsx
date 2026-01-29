import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "user@demo.com",
    phone: "+1234567890",
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@demo.com",
    phone: "+1234567890",
    role: "admin",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: String(Date.now()),
        name,
        email,
        phone,
        role: "user",
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
