import { useState } from "react";
import api from "../../services/api";

export const useDeactivateUser = () => {
  const [loading, setLoading] = useState(false);

  const deactivateUser = async (userId) => {
    setLoading(true);
    try {
      const res = await api.patch(`/admin/users/${userId}/deactivate`);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { deactivateUser, loading };
};
