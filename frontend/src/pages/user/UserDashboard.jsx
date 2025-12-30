import { User, Mail, ShieldCheck, Clock, Edit, KeyRound } from "lucide-react";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { useGetMyProfile } from "../../hooks/user/useGetMyProfile";
import { useState } from "react";
import EditProfileModal from "../../components/user/EditProfileModal";
import ChangePasswordModal from "../../components/user/ChangePasswordModal";

const UserDashboard = () => {
  const { data: user, loading, error } = useGetMyProfile();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading your dashboard..." />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 max-w-6xl mx-auto text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.fullName} 👋
        </h1>
        <p className="text-sm text-gray-500">
          Here’s an overview of your account
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Email */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <Mail className="text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-800">{user.email}</p>
          </div>
        </div>

        {/* Role */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <User className="text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500">Role</p>
            <p className="text-sm font-medium capitalize text-gray-800">
              {user.role}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <ShieldCheck
            className={
              user.status === "active" ? "text-green-600" : "text-red-600"
            }
          />
          <div>
            <p className="text-xs text-gray-500">Account Status</p>
            <p
              className={`text-sm font-medium ${
                user.status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.status}
            </p>
          </div>
        </div>

        {/* Last Login */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <Clock className="text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500">Last Login</p>
            <p className="text-sm font-medium text-gray-800">
              {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" onClick={() => setShowEditProfile(true)}>
            <Edit size={16} />
            Edit Profile
          </Button>

          <Button
            variant="secondary"
            onClick={() => setShowChangePassword(true)}
          >
            <KeyRound size={16} />
            Change Password
          </Button>

          <EditProfileModal
            isOpen={showEditProfile}
            onClose={() => setShowEditProfile(false)}
            user={user}
          />

          <ChangePasswordModal
            isOpen={showChangePassword}
            onClose={() => setShowChangePassword(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
