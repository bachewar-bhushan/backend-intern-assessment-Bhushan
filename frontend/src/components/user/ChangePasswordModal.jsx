import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { useChangePassword } from "../../hooks/user/useChangePassword";
import { showSuccess, showError } from "../../utils/toast";
import { isStrongPassword } from "../../utils/validators";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { changePassword, loading } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    if (!currentPassword || !isStrongPassword(newPassword)) {
      showError(
        "Password must be at least 8 characters with uppercase, lowercase and number"
      );
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      showSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      onClose();
    } catch (err) {
      showError(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Change Password"
      confirmText="Update"
      loading={loading}
      onConfirm={handleUpdate}
      onCancel={onClose}
    >
      <div className="space-y-4">
        <Input
          type="password"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />

        <Input
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
