import { useState } from "react";
import api from "../../services/api";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const res = await api.delete(`/admin/users/${userId}`);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading };
};
