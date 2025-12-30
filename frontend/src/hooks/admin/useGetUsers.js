import { useEffect, useState } from "react";
import api from "../../services/api";

export const useGetUsers = (page = 1, limit = 10, refreshKey = 0) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/admin/users?page=${page}&limit=${limit}`
        );

        setData(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, refreshKey]); // 🔑 IMPORTANT

  return { data, pagination, loading, error };
};
