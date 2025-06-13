import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// 👇 Initial value just to avoid undefined in .Provider
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: () => {},
});

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${expressBackendBaseRESTOrigin}/users/me`, {
          credentials: "include",
        });
        const jsonResponse = await res.json();
        if (jsonResponse.success && jsonResponse.data) {
          setUser(jsonResponse.data);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
