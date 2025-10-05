"use client";

import { useState } from "react";

// SVG Icons as components
const Camera = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const User = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Shield = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Upload = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const Lock = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Eye = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function AccountSettings({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user?.cloudflare_image_url || user?.profile_image || ""
  );
  const [uploading, setUploading] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showMessage("error", "Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showMessage("error", "Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      showMessage("error", "Please select an image first");
      return;
    }
    if (!user?.user_id) {
      showMessage("error", "User not authenticated");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadUrl = `${
        window.BASE_URL || ""
      }/user/api/v1/user/uploadimage/${user?.user_id}/`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showMessage("success", "Profile image updated successfully!");
        setImageFile(null);
      } else {
        showMessage("error", "Failed to upload image. Please try again.");
      }
    } catch (error) {
      showMessage("error", "Network error. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!user?.user_id) {
      showMessage("error", "User not authenticated");
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      showMessage("error", "New passwords don't match");
      return;
    }

    if (passwordData.new_password.length < 6) {
      showMessage("error", "New password must be at least 6 characters long");
      return;
    }

    setPasswordChanging(true);

    try {
      const passwordUrl = `${
        window.BASE_URL || ""
      }/user/api/v1/user/passwordchange/${user?.user_id}/`;
      const response = await fetch(passwordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
          confirm_password: passwordData.confirm_password,
        }),
      });

      if (response.ok) {
        showMessage("success", "Password changed successfully!");
        setPasswordData({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        showMessage("error", errorData.message || "Failed to change password");
      }
    } catch (error) {
      showMessage("error", "Network error. Please check your connection.");
    } finally {
      setPasswordChanging(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Picture", icon: Camera },
    { id: "security", label: "Security Settings", icon: Shield },
  ];

  return (
    <div className="account-settings-container">
      {/* Message Alert */}
      {message.text && (
        <div
          className={`alert alert-${
            message.type === "error" ? "danger" : "success"
          } alert-dismissible fade show mb-4`}
        >
          <div className="d-flex align-items-center">
            <i
              className={`fas fa-${
                message.type === "error" ? "exclamation-circle" : "check-circle"
              } me-2`}
            ></i>
            {message.text}
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      {/* Header */}
      <div className="settings-header mb-4">
        <div className="d-flex align-items-center">
          <div className="header-icon-wrapper">
            <User size={32} />
          </div>
          <div className="ms-3">
            <h2 className="mb-1">Account Settings</h2>
            <p className="text-muted mb-0">
              Manage your profile and security preferences
            </p>
          </div>
        </div>
      </div>

      {/* Sub-menu Navigation */}
      <div className="settings-tabs mb-4">
        <div className="tabs-container">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="settings-content">
        {activeTab === "profile" && (
          <div className="profile-section animate-fade-in">
            <div className="profile-card">
              <div className="card-header-custom">
                <Camera size={24} />
                <h5>Profile Picture</h5>
              </div>
              <div className="card-body-custom">
                <div className="profile-preview-section">
                  <div className="profile-image-wrapper">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-placeholder">
                        <User size={48} />
                      </div>
                    )}
                    <div className="image-overlay">
                      <Camera size={24} />
                    </div>
                  </div>

                  <div className="profile-info">
                    <h6 className="mb-1">
                      {user?.first_name || "User"} {user?.last_name || ""}
                    </h6>
                    <p className="text-muted mb-0">
                      {user?.email || "email@example.com"}
                    </p>
                  </div>
                </div>

                <div className="upload-section">
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                      id="imageInput"
                    />
                    <label htmlFor="imageInput" className="file-label">
                      <Upload size={20} />
                      <span>
                        {imageFile ? imageFile.name : "Choose an image"}
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="btn-upload"
                    onClick={handleImageUpload}
                    disabled={!imageFile || uploading}
                  >
                    {uploading ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Upload Image
                      </>
                    )}
                  </button>
                </div>

                <div className="upload-hints">
                  <p className="hint-text">
                    <i className="fas fa-info-circle me-2"></i>
                    Recommended: Square image, at least 400x400px
                  </p>
                  <p className="hint-text">
                    <i className="fas fa-file-image me-2"></i>
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="security-section animate-fade-in">
            <div className="security-card">
              <div className="card-header-custom">
                <Lock size={24} />
                <h5>Change Password</h5>
              </div>
              <div className="card-body-custom">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group-custom">
                    <label className="form-label-custom">
                      <Lock size={16} />
                      Current Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPasswords.old ? "text" : "password"}
                        className="form-control-custom"
                        value={passwordData.old_password}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            old_password: e.target.value,
                          })
                        }
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            old: !showPasswords.old,
                          })
                        }
                      >
                        {showPasswords.old ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom">
                      <Shield size={16} />
                      New Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        className="form-control-custom"
                        value={passwordData.new_password}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            new_password: e.target.value,
                          })
                        }
                        placeholder="Enter new password"
                        required
                        minLength="6"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom">
                      <Shield size={16} />
                      Confirm New Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        className="form-control-custom"
                        value={passwordData.confirm_password}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirm_password: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                        required
                        minLength="6"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="password-requirements">
                    <p className="requirement-title">Password Requirements:</p>
                    <ul className="requirements-list">
                      <li
                        className={
                          passwordData.new_password.length >= 6 ? "valid" : ""
                        }
                      >
                        <i className="fas fa-check-circle"></i>
                        At least 6 characters long
                      </li>
                      <li
                        className={
                          passwordData.new_password ===
                            passwordData.confirm_password &&
                          passwordData.new_password
                            ? "valid"
                            : ""
                        }
                      >
                        <i className="fas fa-check-circle"></i>
                        Passwords match
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={passwordChanging}
                  >
                    {passwordChanging ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Lock size={20} />
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .account-settings-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .settings-header {
          padding: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          color: white;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .header-icon-wrapper {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .settings-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .settings-tabs {
          background: white;
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .tabs-container {
          display: flex;
          gap: 0.5rem;
        }

        .tab-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border: none;
          background: transparent;
          color: #64748b;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          background: #f1f5f9;
          color: #475569;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .settings-content {
          margin-top: 1.5rem;
        }

        .profile-card,
        .security-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .card-header-custom {
          padding: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-header-custom h5 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .card-body-custom {
          padding: 2rem;
        }

        .profile-preview-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .profile-image-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
        }

        .profile-image-wrapper:hover .image-overlay {
          opacity: 1;
        }

        .profile-info {
          text-align: center;
        }

        .profile-info h6 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }

        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .file-input-wrapper {
          position: relative;
        }

        .file-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .file-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #64748b;
          font-weight: 500;
        }

        .file-label:hover {
          background: #f1f5f9;
          border-color: #667eea;
          color: #667eea;
        }

        .btn-upload {
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-upload:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-upload:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .upload-hints {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .hint-text {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .hint-text:last-child {
          margin-bottom: 0;
        }

        .form-group-custom {
          margin-bottom: 1.5rem;
        }

        .form-label-custom {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .password-input-wrapper {
          position: relative;
        }

        .form-control-custom {
          width: 100%;
          padding: 0.875rem 3rem 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control-custom:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #667eea;
        }

        .password-requirements {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .requirement-title {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .requirements-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .requirements-list li:last-child {
          margin-bottom: 0;
        }

        .requirements-list li i {
          color: #cbd5e1;
        }

        .requirements-list li.valid {
          color: #10b981;
        }

        .requirements-list li.valid i {
          color: #10b981;
        }

        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .settings-header {
            padding: 1rem;
          }

          .header-icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .settings-header h2 {
            font-size: 1.25rem;
          }

          .tabs-container {
            flex-direction: column;
          }

          .tab-button {
            justify-content: flex-start;
            padding: 0.875rem;
          }

          .card-body-custom {
            padding: 1.5rem;
          }

          .profile-image-wrapper {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}
