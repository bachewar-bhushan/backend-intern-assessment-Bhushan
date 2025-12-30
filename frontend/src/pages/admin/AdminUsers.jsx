import { useState } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import { useGetUsers } from "../../hooks/admin/useGetUsers";
import { useActivateUser } from "../../hooks/admin/useActivateUser";
import { useDeactivateUser } from "../../hooks/admin/useDeactivateUser";
import { useDeleteUser } from "../../hooks/admin/useDeleteUser";

import { showSuccess, showError } from "../../utils/toast";

const USERS_PER_PAGE = 10;


const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: users, pagination, loading, error } = useGetUsers(
    page,
    USERS_PER_PAGE,
    refreshKey
  );

  const { activateUser } = useActivateUser();
  const { deactivateUser } = useDeactivateUser();
  const { deleteUser } = useDeleteUser();

const handleDeactivate = async (id) => {
  try {
    await deactivateUser(id);
    showSuccess("User deactivated");
    setRefreshKey((k) => k + 1); // 🔁 refetch
  } catch (err) {
    showError(err.response?.data?.message || "Action failed");
  }
};

const handleActivate = async (id) => {
  try {
    await activateUser(id);
    showSuccess("User activated");
    setRefreshKey((k) => k + 1);
  } catch (err) {
    showError(err.response?.data?.message || "Action failed");
  }
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure?")) return;

  try {
    await deleteUser(id);
    showSuccess("User deleted");
    setRefreshKey((k) => k + 1);
  } catch (err) {
    showError(err.response?.data?.message || "Delete failed");
  }
};


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading users..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage all registered users
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-800">
                    {user.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    <span className="px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {user.status === "active" ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600">
                        <XCircle size={16} />
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {user.status === "active" ? (
                        <Button
                          variant="secondary"
                          onClick={() => handleDeactivate(user._id)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => handleActivate(user._id)}
                        >
                          Activate
                        </Button>
                      )}

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default AdminUsers;
