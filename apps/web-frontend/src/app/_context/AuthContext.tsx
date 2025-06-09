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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${expressBackendBaseRESTOrigin}/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
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
  return useContext(AuthContext);
}
