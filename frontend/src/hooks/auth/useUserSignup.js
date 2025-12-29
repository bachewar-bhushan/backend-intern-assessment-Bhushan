import { useState } from "react";
import api from "../../services/api";

export const useUserSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", data, {
        withCredentials: true,
      });
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};
