import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export const useGetMyProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");

        setData(res.data.data);
        setUser(res.data.data); // 🔑 STORE IN ZUSTAND
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        clearUser(); // 🔑 invalidate session
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser, clearUser]);

  return { data, loading, error };
};
