"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import Image from "next/image";
import Link from "next/link";

// Loading component for logo
const Loading = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ width: "60px", height: "60px" }}
  >
    <div
      className="spinner-border spinner-border-sm text-primary"
      role="status"
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
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  // Logo query (keeping Redux for this)
  const {
    data: logoData,
    isSuccess: logoSuccess,
    isLoading: logoLoading,
  } = useGetLogoUrlQuery(null);

  let logoUrl = "";
  if (logoSuccess) {
    logoUrl = `${logoData?.general_settings[0].cloudflare_favicon}`;
  }

  // Redirect if authenticated (but not during initial loading)
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [isAuthenticated, isLoading, router]);

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
      const result = await login(username.trim(), password);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative">
      {/* Background Pattern */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          opacity: 0.1,
          zIndex: 0,
        }}
      ></div>

      <div
        className="container-fluid px-3 position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Header with Logo */}
              <div className="card-header bg-white text-center py-4 border-bottom-0">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="me-3">
                    <Link href="/" className="text-decoration-none">
                      {logoLoading ? (
                        <Loading />
                      ) : (
                        <Image
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          src={logoUrl}
                          width={128}
                          height={128}
                          alt="Hajj, Umrah and Ziarah"
                          className="img-fluid"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="text-start">
                    <h1 className="h3 fw-bold text-dark mb-1">Welcome Back</h1>
                    <p className="text-muted small mb-0">
                      Sign in to your account
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="card-body p-4">
                {/* Error Alert */}
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show mb-4"
                    role="alert"
                  >
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Username Field */}
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label fw-semibold text-dark"
                  >
                    <i className="fas fa-user me-2 text-primary"></i>
                    Username or Email
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Email or Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="form-control form-control-lg rounded-3"
                    style={{
                      border: "2px solid #0d6efd",
                      borderRadius: "0.75rem",
                      transition: "all 0.3s ease",
                      backgroundColor: isLoading ? "#f8f9fa" : "white",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 0 0.25rem rgba(13, 110, 253, 0.25)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-dark"
                  >
                    <i className="fas fa-lock me-2 text-primary"></i>
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="form-control form-control-lg rounded-3 pe-5"
                      style={{
                        border: "2px solid #0d6efd",
                        borderRadius: "0.75rem",
                        transition: "all 0.3s ease",
                        backgroundColor: isLoading ? "#f8f9fa" : "white",
                      }}
                      onFocus={(e) =>
                        (e.target.style.boxShadow =
                          "0 0 0 0.25rem rgba(13, 110, 253, 0.25)")
                      }
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 text-muted"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      style={{
                        border: "none",
                        background: "none",
                        fontSize: "1.1rem",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <i className="icon-eye"></i>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.username.trim() ||
                      !formData.password.trim()
                    }
                    className="btn btn-primary btn-lg rounded-3 py-3 fw-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                      transform: isLoading ? "none" : "translateY(0)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 8px 25px rgba(13, 110, 253, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Links */}
                {/* <div className="text-center mt-4">
                  <p className="text-muted small mb-2">
                    Forgot your password?
                    <a
                      href="/forgot-password"
                      className="text-primary text-decoration-none ms-1 fw-semibold"
                    >
                      Reset it here
                    </a>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
