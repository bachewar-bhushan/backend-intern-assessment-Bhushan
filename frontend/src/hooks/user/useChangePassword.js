import { useState } from "react";
import api from "../../services/api";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (payload) => {
    setLoading(true);
    try {
      const res = await api.put("/users/me/password", payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading };
};
