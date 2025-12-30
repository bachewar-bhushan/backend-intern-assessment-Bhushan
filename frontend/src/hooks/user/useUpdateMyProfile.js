import { useState } from "react";
import api from "../../services/api";

export const useUpdateMyProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (payload) => {
    setLoading(true);
    try {
      const res = await api.put("/users/me", payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};
