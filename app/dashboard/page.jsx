"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import OrderDetails from "@/components/dashboard/OrderDetails";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TourOrders from "@/components/dashboard/TourOrders";
import SupportTickets from "@/components/dashboard/SupportTickets";
import AccountSettings from "@/components/dashboard/AccountSettings";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/protected-route";
import { useTourBookings } from "@/hooks/useTourBookings";
import Image from "next/image";

// Memoized navigation items to prevent unnecessary re-renders
const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "icon-route",
  },
  {
    id: "tour-orders",
    label: "Tour Orders",
    icon: "icon-route",
  },
  {
    id: "support",
    label: "Support",
    icon: "icon-route",
  },
  {
    id: "account",
    label: "Profile",
    icon: "icon-route",
  },
];

// Memoized sidebar navigation component
const SidebarNavigation = ({
  activeSection,
  setActiveSection,
  bookingsLoading,
  handleLogout,
  user,
}) => {
  return (
    <div className="sidebar-content h-100 d-flex flex-column">
      {/* User Profile Section */}
      <div className="p-3 flex-shrink-0">
        <div className="text-center mb-4 pb-3 border-bottom border-white border-opacity-25">
          <div
            className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-2 overflow-hidden"
            style={{ width: "60px", height: "60px" }}
          >
            {user?.cloudflare_image_url ? (
              <Image
                src={user.cloudflare_image_url}
                alt={user?.first_name || "User"}
                width={60}
                height={60}
                className="rounded-circle object-cover"
              />
            ) : (
              <i className="icon-user" style={{ fontSize: "2rem" }}></i>
            )}
          </div>
          <h6 className="mb-0 opacity-75">Welcome back,</h6>
          <h5 className="fw-bold">{user?.first_name || "Travel Manager"}</h5>
        </div>
      </div>

      {/* Navigation Items - Scrollable */}
      <nav
        className="nav flex-column flex-grow-1 px-3"
        style={{ overflowY: "auto" }}
      >
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-link border-0 mt-2 text-start mb-2 rounded-3 p-3 position-relative nav-button ${
              activeSection === item.id ? "active-dark" : "inactive"
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <i className={`${item.icon} text-14 me-3`}></i>
            {item.label}
            {bookingsLoading && activeSection === item.id && (
              <div
                className="spinner-border spinner-border-sm ms-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {activeSection === item.id && (
              <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                <i className="icon-chevron-right"></i>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Section - Fixed at bottom */}
      <div className="p-3 flex-shrink-0">
        <hr className="my-3 border-white border-opacity-25" />
        <button
          className="nav-link text-white border-0 text-start rounded-3 p-3 opacity-75 hover-opacity-100 w-100"
          onClick={handleLogout}
        >
          <i className="icon-log-out text-14 me-3"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Use the custom hook for tour bookings
  const {
    bookingData,
    loading: bookingsLoading,
    error: bookingsError,
    updateBookingStatus,
    refreshBookings,
    changePage,
    currentPage,
    pageSize,
    changePageSize,
  } = useTourBookings(user?.traveller_id);

  // Optimized payment return handler with cleanup
  useEffect(() => {
    const handlePaymentReturn = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("payment_status");

      if (paymentStatus === "success") {
        refreshBookings();
        alert("Payment completed successfully!");
        // Clean up URL without triggering navigation
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      } else if (paymentStatus === "cancelled") {
        alert("Payment was cancelled.");
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    };

    handlePaymentReturn();
  }, [refreshBookings]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handlePayment = useCallback(
    async (orderId) => {
      try {
        const order = bookingData.orders.find((o) => o.id === orderId);

        if (order && order.paymentUrl) {
          const paymentWindow = window.open(
            order.paymentUrl,
            "_blank",
            "width=800,height=600,scrollbars=yes,resizable=yes"
          );

          if (!paymentWindow) {
            alert(
              "Payment window was blocked. Please allow popups and try again."
            );
            return;
          }

          setSelectedOrder(null);

          const checkClosed = setInterval(() => {
            if (paymentWindow.closed) {
              clearInterval(checkClosed);
              setTimeout(() => refreshBookings(), 2000);
            }
          }, 1000);
        } else {
          updateBookingStatus(orderId, "paid");
          setSelectedOrder(null);
        }
      } catch (error) {
        console.error("Payment processing failed:", error);
        alert(`Payment failed: ${error.message}`);
      }
    },
    [bookingData.orders, updateBookingStatus, refreshBookings]
  );

  // Memoized content renderer
  const renderContent = useMemo(() => {
    const props = {
      orderData: bookingData,
      loading: bookingsLoading,
      onRefresh: refreshBookings,
      user,
    };

    switch (activeSection) {
      case "dashboard":
        return <DashboardSummary {...props} />;
      case "tour-orders":
        return (
          <TourOrders
            {...props}
            onOrderSelect={setSelectedOrder}
            onPageChange={changePage}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageSizeChange={changePageSize}
          />
        );
      case "support":
        return <SupportTickets />;
      case "account":
        return <AccountSettings user={user} />;
      default:
        return <DashboardSummary {...props} />;
    }
  }, [
    activeSection,
    bookingData,
    bookingsLoading,
    refreshBookings,
    user,
    changePage,
    currentPage,
    pageSize,
    changePageSize,
  ]);

  // Early return for loading state
  if (authLoading) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Early return for unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3 className="text-primary">Access Denied</h3>
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  if (bookingsError && activeSection === "dashboard") {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <i className="icon-alert-circle text-danger text-14 mb-3"></i>
          <h3 className="text-danger">Failed to Load Bookings</h3>
          <p className="text-muted">{bookingsError}</p>
          <button className="btn btn-primary" onClick={refreshBookings}>
            <i className="icon-refresh-cw text-14 me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button
        className="btn btn-primary d-md-none mobile-menu-toggle"
        onClick={handleSidebarToggle}
        aria-label="Toggle navigation menu"
      >
        <i className="icon-menu"></i> Menu
      </button>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
          aria-label="Navigation sidebar"
        >
          <SidebarNavigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            bookingsLoading={bookingsLoading}
            handleLogout={handleLogout}
            user={user}
          />
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="mobile-overlay d-md-none"
            onClick={handleSidebarClose}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">{renderContent}</div>
        </main>
      </div>

      {/* Order Details Modal */}
      <OrderDetails
        selectedOrder={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onPayment={handlePayment}
      />

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          padding-top: 120px;
        }

        .dashboard-sidebar {
          background: var(--bs-blue-1, #0d6efd);
          color: white;
          flex-shrink: 0;
          position: relative;
          transition: transform 0.3s ease-in-out;
        }

        .dashboard-main {
          flex: 1;
          background-color: #f8f9fa;
          min-width: 0;
        }

        .dashboard-content {
          padding: 1.5rem;
        }

        .mobile-menu-toggle {
          position: fixed;
          top: 90px;
          left: 1rem;
          z-index: 1050;
          border-radius: 50px;
          padding: 0.5rem 1rem;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1040;
          backdrop-filter: blur(2px);
        }

        .sidebar-content {
          height: 100%;
        }

        .nav-button {
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.8);
          background: transparent;
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(4px);
        }

        .nav-button.active-dark {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 600;
        }

        .nav-button.inactive {
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 767.98px) {
          .dashboard-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1050;
            transform: translateX(-100%);
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          }

          .dashboard-sidebar.sidebar-open {
            transform: translateX(0);
            width: 250px;
          }

          .dashboard-main {
            width: 100%;
          }

          .dashboard-content {
            padding: 1rem;
          }

          .sidebar-content {
            padding-top: 120px;
            height: 100vh;
            overflow: hidden;
          }
        }

        @media (min-width: 768px) {
          .dashboard-sidebar {
            position: relative;
            transform: none !important;
          }

          .mobile-menu-toggle {
            display: none;
          }
        }

        @media (min-width: 992px) {
          .dashboard-sidebar {
            width: 200px;
          }

          .dashboard-content {
            padding: 2rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-sidebar,
          .nav-button {
            transition: none;
          }
        }

        .nav-button:focus,
        .mobile-menu-toggle:focus {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
