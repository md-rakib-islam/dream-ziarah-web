"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "@/features/auth/authSlice";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import Image from "next/image";
import Link from "next/link";

// Loading component for logo
const Loading = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ width: "80px", height: "80px" }}
  >
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ width: "3rem", height: "3rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Logo query
  const {
    data: logoData,
    isSuccess: logoSuccess,
    isLoading: logoLoading,
  } = useGetLogoUrlQuery(null);

  let logoUrl = "";
  if (logoSuccess) {
    logoUrl = `${logoData?.general_settings[0].cloudflare_favicon}`;
  }

  if (isAuthenticated) {
    router.push("/dashboard");
    router.refresh();
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const { username, password } = formData;

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUserThunk({ username: username.trim(), password })
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(
          resultAction.payload || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "100px",
        paddingBottom: "60px",
      }}
    >
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        className="container-fluid px-3 position-relative"
        style={{ zIndex: 1, animation: "fadeInUp 0.8s ease-out" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card border-0 rounded-4"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.95)",
                overflow: "visible",
              }}
            >
              {/* Header with Logo */}
              <div
                className="text-center pb-4 px-4"
                style={{ paddingTop: "2rem" }}
              >
                <div
                  className="mb-4"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                >
                  <Link
                    href="/"
                    className="text-decoration-none d-inline-block"
                  >
                    {logoLoading ? (
                      <Loading />
                    ) : (
                      <Image
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "20px",
                          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                          border: "4px solid rgba(255, 255, 255, 0.9)",
                          transition: "transform 0.3s ease",
                        }}
                        src={logoUrl}
                        width={128}
                        height={128}
                        alt="Hajj, Umrah and Ziarah"
                        className="img-fluid"
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                    )}
                  </Link>
                </div>
                <h1
                  className="h2 fw-bold mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Welcome Back
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-4 px-sm-5 pb-5 pt-2">
                {/* Error Alert */}
                {error && (
                  <div
                    className="alert alert-dismissible fade show mb-4 border-0"
                    role="alert"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                      color: "white",
                      borderRadius: "12px",
                      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                    }}
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <strong>Error:</strong> {error}
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setError("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Username Field */}
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#344767", fontSize: "0.9rem" }}
                  >
                    <i
                      className="fas fa-user me-2"
                      style={{ color: "#667eea" }}
                    ></i>
                    Username or Email
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username or email"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="form-control form-control-lg"
                    style={{
                      border: "2px solid #e9ecef",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      transition: "all 0.3s ease",
                      backgroundColor: isLoading ? "#f8f9fa" : "white",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "2px solid #667eea";
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "2px solid #e9ecef";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#344767", fontSize: "0.9rem" }}
                  >
                    <i
                      className="fas fa-lock me-2"
                      style={{ color: "#667eea" }}
                    ></i>
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="form-control form-control-lg"
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        paddingRight: "50px",
                        transition: "all 0.3s ease",
                        backgroundColor: isLoading ? "#f8f9fa" : "white",
                        fontSize: "0.95rem",
                      }}
                      onFocus={(e) => {
                        e.target.style.border = "2px solid #667eea";
                        e.target.style.boxShadow =
                          "0 0 0 4px rgba(102, 126, 234, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border = "2px solid #e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#667eea",
                        fontSize: "1.2rem",
                        padding: "8px 12px",
                        transition: "all 0.2s ease",
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) =>
                        !isLoading && (e.target.style.color = "#764ba2")
                      }
                      onMouseLeave={(e) =>
                        !isLoading && (e.target.style.color = "#667eea")
                      }
                    >
                      <i className="icon-eye"></i>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.username.trim() ||
                      !formData.password.trim()
                    }
                    className="btn btn-lg fw-bold position-relative overflow-hidden"
                    style={{
                      background: isLoading
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "12px",
                      padding: "16px",
                      color: "white",
                      fontSize: "1rem",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.35)",
                      opacity:
                        isLoading ||
                        !formData.username.trim() ||
                        !formData.password.trim()
                          ? 0.7
                          : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (
                        !isLoading &&
                        formData.username.trim() &&
                        formData.password.trim()
                      ) {
                        e.target.style.transform = "translateY(-3px)";
                        e.target.style.boxShadow =
                          "0 12px 30px rgba(102, 126, 234, 0.45)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 8px 20px rgba(102, 126, 234, 0.35)";
                      }
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-3"
                          role="status"
                          aria-hidden="true"
                          style={{ width: "1.2rem", height: "1.2rem" }}
                        ></span>
                        Signing you in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In to Dashboard
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Links */}
                {/* <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    Forgot your password?
                    <a
                      href="/forgot-password"
                      className="ms-2 fw-semibold text-decoration-none"
                      style={{ color: "#667eea" }}
                    >
                      Reset it here
                    </a>
                  </p>
                </div> */}

                {/* Footer Note */}
                <div className="text-center mt-4 pt-3 border-top">
                  <p
                    className="text-muted small mb-0"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i
                      className="fas fa-shield-alt me-2"
                      style={{ color: "#667eea" }}
                    ></i>
                    Secure login with encrypted connection
                  </p>
                </div>
              </form>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-4">
              <Link
                href="/"
                className="text-decoration-none d-inline-flex align-items-center fw-semibold"
                style={{
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease",
                  color: "#667eea",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateX(-5px)";
                  e.target.style.color = "#764ba2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateX(0)";
                  e.target.style.color = "#667eea";
                }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
