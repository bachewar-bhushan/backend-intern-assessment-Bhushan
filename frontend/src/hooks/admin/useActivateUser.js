import { useState } from "react";
import api from "../../services/api";

export const useActivateUser = () => {
  const [loading, setLoading] = useState(false);

  const activateUser = async (userId) => {
    setLoading(true);
    try {
      const res = await api.patch(`/admin/users/${userId}/activate`);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { activateUser, loading };
};
