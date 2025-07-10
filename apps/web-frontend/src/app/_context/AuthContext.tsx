import { CACHED_USER_KEY } from "@/_constants/stringKeys";
import { User } from "@/_types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
    const cachedUser = sessionStorage.getItem(CACHED_USER_KEY);
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include",
        });
        const jsonResponse = await res.json();
        if (jsonResponse.success && jsonResponse.data) {
          setUser(jsonResponse.data);
          sessionStorage.setItem(
            CACHED_USER_KEY,
            JSON.stringify(jsonResponse.data),
          );
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(CACHED_USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(CACHED_USER_KEY);
    }
  }, [user]);

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
