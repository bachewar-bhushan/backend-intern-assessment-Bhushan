import { useState } from "react";
import api from "../../services/api";

export const useUserLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data, {
        withCredentials: true,
      });
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
