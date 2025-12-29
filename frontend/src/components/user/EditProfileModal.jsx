import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { useUpdateMyProfile } from "../../hooks/user/useUpdateMyProfile";
import { showSuccess, showError } from "../../utils/toast";
import { isValidEmail } from "../../utils/validators";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { updateProfile, loading } = useUpdateMyProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Populate fields when modal opens
  useEffect(() => {
    if (user && isOpen) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
    }
  }, [user, isOpen]);

  const handleSave = async () => {
    if (!fullName || !isValidEmail(email)) {
      showError("Please enter valid name and email");
      return;
    }

    try {
      await updateProfile({ fullName, email });
      showSuccess("Profile updated successfully");
      onClose();
    } catch (err) {
      showError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Profile"
      confirmText="Save"
      loading={loading}
      onConfirm={handleSave}
      onCancel={onClose}
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
        />

        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          placeholder="Enter email"
        />
      </div>
    </Modal>
  );
};

export default EditProfileModal;
