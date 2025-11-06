import { useQuery } from "@tanstack/react-query";
import api from "@/_libs/axios";

const fetchUser = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
