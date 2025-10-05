"use client";

import { useState, useMemo, useEffect } from "react";
import CancellationModal from "./Cancellation";
import ChangeDate from "./ChangeDate";
import PaginationControls from "./PaginationControls";
import MobileOrderCard from "./MobileOrderCard";
import FilterTourOrder from "./FilterTourOrder";

export default function TourOrders({
  orderData,
  onOrderSelect,
  loading,
  onRefresh,
  onCancelRequest,
  onDateChange,
  onPageChange,
  currentPage,
  pageSize,
  onPageSizeChange,
}) {
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });

  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [selectedOrderForDateChange, setSelectedOrderForDateChange] =
    useState(null);

  useEffect(() => {
    if (!selectedOrderForCancel && !selectedOrderForDateChange) {
      onRefresh();
    }
  }, [selectedOrderForCancel, selectedOrderForDateChange, onRefresh]);

  if (!orderData || !orderData.orders) {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="text-center py-5">
          <i
            className="icon-alert-circle text-warning mb-3"
            style={{ fontSize: "4rem" }}
          ></i>
          <h4 className="text-muted">No Data Available</h4>
          <p className="text-muted">Unable to load tour booking data</p>
          <button className="btn btn-primary" onClick={onRefresh}>
            <i className="icon-refresh-cw me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredOrders = useMemo(() => {
    let filtered = [...orderData.orders];

    // Filter by status
    if (filters.status !== "all") {
      if (filters.status === "cancelled") {
        filtered = filtered.filter(
          (order) =>
            order.status === "cancelled" ||
            (order.cancellation_status &&
              order.cancellation_status.toLowerCase() === "approved")
        );
      } else {
        filtered = filtered.filter(
          (order) =>
            order.status === filters.status &&
            !(
              order.cancellation_status &&
              order.cancellation_status.toLowerCase() === "approved"
            )
        );
      }
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (order) => new Date(order.datePurchased) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (order) => new Date(order.datePurchased) <= new Date(filters.dateTo)
      );
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          order.tourName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          order.customerName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    // Sort by status priority
    const statusPriorityUpdated = {
      paid: 3,
      pending: 2,
      cancelled: 1,
      refunded: 1,
    };

    filtered.sort((a, b) => {
      const aStatus =
        a.cancellation_status &&
        a.cancellation_status.toLowerCase() === "approved"
          ? "cancelled"
          : a.status;
      const bStatus =
        b.cancellation_status &&
        b.cancellation_status.toLowerCase() === "approved"
          ? "cancelled"
          : b.status;

      return statusPriorityUpdated[bStatus] - statusPriorityUpdated[aStatus];
    });

    return filtered;
  }, [orderData.orders, filters]);

  // Helper functions
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return "icon-check-circle me-2";
      case "pending":
        return "icon-clock me-2";
      case "cancelled":
        return "icon-x-circle me-2";
      default:
        return "icon-help-circle me-2";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusCount = (status) => {
    if (status === "all") return orderData.orders.length;

    if (status === "cancelled") {
      return orderData.orders.filter(
        (order) =>
          order.status === "cancelled" ||
          (order.cancellation_status &&
            order.cancellation_status.toLowerCase() === "approved")
      ).length;
    }

    return orderData.orders.filter(
      (order) =>
        order.status === status &&
        !(
          order.cancellation_status &&
          order.cancellation_status.toLowerCase() === "approved"
        )
    ).length;
  };

  const canCancelOrder = (order) => {
    // Don't show cancel button if date change was approved
    if (
      order.date_change_request === false &&
      order.date_change_request_status &&
      order.date_change_request_status.toLowerCase() === "approved"
    ) {
      return false;
    }
    // Check if cancellation is eligible
    if (!order.cancellation_eligible) {
      return false;
    }
    return order.status === "paid" || order.status === "pending";
  };

  const canChangeDate = (order) => {
    return order.status === "paid" || order.status === "pending";
  };

  const isOrderDisabled = (order) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day

    const orderDate = new Date(order.selectedDate);
    orderDate.setHours(0, 0, 0, 0); // normalize to start of day

    const isPastDate = orderDate < today;

    return (
      isPastDate ||
      (order.cancellation_request === false &&
        order.cancellation_status &&
        order.cancellation_status.toLowerCase() === "approved")
    );
  };

  const hasActiveCancellationRequest = (order) => {
    return order.cancellation_request === true;
  };

  const hasActiveDateChangeRequest = (order) => {
    return order.date_change_request === true;
  };

  const getDateChangeRequestStatus = (order) => {
    if (order.date_change_request === true) {
      return {
        showStatus: true,
        status: order.date_change_request_status || "reviewing",
        badgeColor: "info",
        text: "Date Change Request",
        showButton: false,
      };
    }

    if (
      order.date_change_request === false &&
      order.date_change_request_status
    ) {
      const status = order.date_change_request_status.toLowerCase();

      if (status === "denied") {
        return {
          showStatus: true,
          status: "denied",
          badgeColor: "danger",
          text: "Date Change Denied",
          showButton: true, // Show button for denied requests
          tooltip: "Your date change request has been denied by admin",
        };
      }

      return {
        showStatus: true,
        status: order.date_change_request_status,
        badgeColor:
          status === "approved"
            ? "success"
            : status === "cancelled"
            ? "danger"
            : "secondary",
        text:
          status === "approved"
            ? "Date Change Approved"
            : status === "cancelled"
            ? "Date Change Rejected"
            : "Date Change Request",
        showButton: false,
      };
    }

    return { showStatus: false, showButton: true };
  };

  const getCancellationRequestStatus = (order) => {
    if (order.cancellation_request === true) {
      return {
        showStatus: true,
        status: order.cancellation_status || "reviewing",
        badgeColor: "warning",
        text: "Cancellation Request",
      };
    }

    if (order.cancellation_request === false && order.cancellation_status) {
      const status = order.cancellation_status.toLowerCase();
      return {
        showStatus: true,
        status: order.cancellation_status,
        badgeColor:
          status === "approved"
            ? "success"
            : status === "rejected"
            ? "danger"
            : "secondary",
        text:
          status === "approved"
            ? "Cancellation Approved"
            : status === "rejected"
            ? "Cancellation Rejected"
            : "Cancellation Request",
      };
    }

    return { showStatus: false };
  };

  // Event handlers
  const handleCancelClick = (order, e) => {
    e.stopPropagation();
    console.log(
      "Cancel clicked:",
      order.booking_id,
      "isDisabled:",
      isOrderDisabled(order),
      "canCancel:",
      canCancelOrder(order)
    );
    if (isOrderDisabled(order)) return;
    setSelectedOrderForCancel(order);
  };

  const handleDateChangeClick = (order, e) => {
    e.stopPropagation();
    if (isOrderDisabled(order)) return;
    setSelectedOrderForDateChange(order);
  };

  const handleCancelSubmit = async (cancellationData) => {
    try {
      await onCancelRequest(cancellationData);
      setSelectedOrderForCancel(null);
    } catch (error) {
      console.error("Cancel request failed:", error);
    }
  };

  const handleDateChangeSubmit = async (dateChangeData) => {
    try {
      await onDateChange(dateChangeData);
      setSelectedOrderForDateChange(null);
      onRefresh();
    } catch (error) {
      console.error("Date change request failed:", error);
    }
  };

  // Component to render cancel button or status for desktop view
  const CancelButtonOrStatus = ({ order, isDesktop = false }) => {
    const statusInfo = getCancellationRequestStatus(order);

    // Check if date change was approved - show replacement text instead
    if (
      order.date_change_request === false &&
      order.date_change_request_status &&
      order.date_change_request_status.toLowerCase() === "approved"
    ) {
      return (
        <div className="text-center">
          <span
            className="text-success fw-semibold"
            style={{ fontSize: "11px", cursor: "help" }}
            title="Your tour date has been successfully changed. The new date is now confirmed and cancellation is no longer available for this booking."
          >
            <i className="icon-check-circle me-1"></i>
            Date Updated
          </span>
        </div>
      );
    }

    // Show active cancellation request status
    if (statusInfo.showStatus && order.cancellation_request === true) {
      return (
        <div
          className={`text-center ${
            isDesktop ? "" : "d-flex align-items-center justify-content-center"
          }`}
        >
          <div className="d-flex flex-column align-items-center">
            <span
              className={`badge bg-${statusInfo.badgeColor} text-dark px-2 py-1 mb-1`}
              style={{ fontSize: "10px" }}
            >
              <i className="icon-clock me-1"></i>
              {statusInfo.status}
            </span>
            <small className="text-muted" style={{ fontSize: "9px" }}>
              {statusInfo.text}
            </small>
          </div>
        </div>
      );
    }

    if (canCancelOrder(order) && !isOrderDisabled(order)) {
      const isDenied =
        order.cancellation_status &&
        order.cancellation_status.toLowerCase() === "denied";

      return (
        <div className="d-flex flex-column align-items-center">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={(e) => handleCancelClick(order, e)}
            title="Cancel booking"
            style={{
              fontSize: isDesktop ? "11px" : "12px",
              padding: isDesktop ? "4px 8px" : "6px 12px",
            }}
          >
            <i className="icon-x me-1"></i>
            Cancel
          </button>
          {isDenied && (
            <small className="text-danger mt-1" style={{ fontSize: "9px" }}>
              <i className="icon-x-circle me-1"></i>
              Request was denied
            </small>
          )}
        </div>
      );
    }

    return <span className="text-muted">-</span>;
  };

  // Component to render change date button or status for desktop view
  const ChangeDateButtonOrStatus = ({ order, isDesktop = false }) => {
    const statusInfo = getDateChangeRequestStatus(order);

    if (statusInfo.showStatus) {
      return (
        <div className="text-center">
          <div className="d-flex flex-column align-items-center">
            <span
              className={`badge bg-${statusInfo.badgeColor} text-dark px-2 py-1 mb-1`}
              style={{ fontSize: "10px" }}
            >
              <i
                className={`${
                  statusInfo.badgeColor === "success"
                    ? "icon-check"
                    : statusInfo.badgeColor === "danger"
                    ? "icon-x"
                    : "icon-clock"
                } me-1`}
              ></i>
              {statusInfo.status}
            </span>
            <small className="text-muted" style={{ fontSize: "9px" }}>
              {statusInfo.text}
            </small>

            {/* Show button for denied requests */}
            {statusInfo.showButton &&
              statusInfo.status === "denied" &&
              canChangeDate(order) &&
              !isOrderDisabled(order) && (
                <button
                  className="btn btn-outline-primary btn-sm bg-yellow-4 mt-1"
                  onClick={(e) => handleDateChangeClick(order, e)}
                  title={statusInfo.tooltip}
                  style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                  }}
                >
                  <i className="icon-calendar me-1"></i>
                  Try Again
                </button>
              )}
          </div>
        </div>
      );
    }

    if (canChangeDate(order) && !isOrderDisabled(order)) {
      return (
        <button
          className="btn btn-outline-primary btn-sm bg-yellow-4"
          onClick={(e) => handleDateChangeClick(order, e)}
          title="Change booking date"
          style={{
            fontSize: isDesktop ? "11px" : "12px",
            padding: isDesktop ? "4px 8px" : "6px 12px",
          }}
        >
          <i className="icon-calendar me-1"></i>
          Change {isDesktop ? "" : "Date"}
        </button>
      );
    }

    return <span className="text-muted">-</span>;
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <i
              className="icon-route me-3"
              style={{ fontSize: "2rem", color: "#3554d1" }}
            ></i>
            <div>
              <h2 className="mb-0 text-primary">Tour Bookings</h2>
              <p className="text-muted mb-0 d-none d-md-block">
                Manage all your tour reservations
              </p>
            </div>
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                Refreshing...
              </>
            ) : (
              <>
                <i className="icon-refresh-cw me-2"></i>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Filters Section */}
        <FilterTourOrder
          filters={filters}
          onFiltersChange={setFilters}
          getStatusCount={getStatusCount}
          orderDataLength={orderData.orders.length}
          filteredOrdersLength={filteredOrders.length}
        />

        {/* Orders Display */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">Loading tour bookings...</h5>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="icon-search text-muted mb-3"
              style={{ fontSize: "4rem" }}
            ></i>
            <h4 className="text-muted">No tours found</h4>
            <p className="text-muted">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="d-sm-none">
              {filteredOrders.map((order) => (
                <MobileOrderCard
                  key={order.id}
                  order={order}
                  onOrderSelect={onOrderSelect}
                  onCancelClick={handleCancelClick}
                  onDateChangeClick={handleDateChangeClick}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getCancellationRequestStatus={getCancellationRequestStatus}
                  getDateChangeRequestStatus={getDateChangeRequestStatus}
                  canCancelOrder={canCancelOrder}
                  canChangeDate={canChangeDate}
                  isOrderDisabled={isOrderDisabled}
                />
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="d-none d-sm-block">
              <div className="card border-0 shadow-lg">
                <div
                  className="card-header text-white position-relative"
                  style={{ backgroundColor: "#3554d1" }}
                >
                  <div className="position-absolute top-0 end-0 opacity-25">
                    <i
                      className="icon-compass"
                      style={{ fontSize: "4rem" }}
                    ></i>
                  </div>
                  <h5 className="mb-0 position-relative">
                    <i className="icon-list me-2"></i>
                    Tour Reservations ({filteredOrders.length})
                  </h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table
                      className="table table-hover mb-0"
                      style={{ overflow: "hidden" }}
                    >
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "15%" }}
                          >
                            Booking ID
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%", whiteSpace: "nowrap" }}
                          >
                            Payment Status
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "20%" }}
                          >
                            Tour Name
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "8%" }}
                          >
                            Travelers
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "12%", whiteSpace: "nowrap" }}
                          >
                            Tour Date
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%" }}
                          >
                            TotalCost
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%", whiteSpace: "nowrap" }}
                          >
                            Change Date
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%" }}
                          >
                            Cancel
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => {
                          const disabled = isOrderDisabled(order);

                          return (
                            <tr
                              key={order.id}
                              className={`align-middle border-bottom ${
                                disabled ? "table-secondary opacity-50" : ""
                              }`}
                              style={{
                                cursor: disabled ? "not-allowed" : "pointer",
                                filter: disabled ? "grayscale(50%)" : "none",
                              }}
                              onClick={
                                disabled
                                  ? undefined
                                  : () => onOrderSelect(order)
                              }
                              onMouseEnter={(e) => {
                                if (!disabled) {
                                  e.currentTarget.style.backgroundColor =
                                    "#f8f9fa";
                                  e.currentTarget.style.transform =
                                    "scale(1.01)";
                                  e.currentTarget.style.transition =
                                    "all 0.2s ease";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!disabled) {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.transform = "scale(1)";
                                }
                              }}
                            >
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                    <i className="icon-ticket text-primary"></i>
                                  </div>
                                  <div>
                                    <strong
                                      className="text-primary d-block"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {order.booking_id}
                                    </strong>
                                    <small className="text-muted">
                                      {order.customerName}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="d-flex flex-column align-items-start">
                                  <span
                                    className={`badge bg-${getStatusColor(
                                      order.status
                                    )} d-flex align-items-center justify-content-center mb-1 text-dark`}
                                    style={{
                                      width: "90px",
                                      padding: "6px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <i
                                      className={getStatusIcon(order.status)}
                                    ></i>
                                    {order.status.charAt(0).toUpperCase() +
                                      order.status.slice(1)}
                                  </span>
                                  {order.status === "pending" && !disabled && (
                                    <small
                                      className="text-primary fw-semibold"
                                      style={{ fontSize: "9px" }}
                                    >
                                      <i className="icon-hand me-1"></i>
                                      Click to pay
                                    </small>
                                  )}
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <i className="icon-globe text-primary me-2"></i>
                                  <div style={{ maxWidth: "180px" }}>
                                    <strong
                                      title={order.tourName}
                                      className="d-block text-truncate"
                                    >
                                      {order.tourName}
                                    </strong>
                                    <small className="text-muted d-block text-truncate">
                                      {order.selectedTime} • ${order.totalPrice}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                  <div className="bg-info bg-opacity-10 rounded-circle p-1 me-1">
                                    <i
                                      className="icon-users text-info"
                                      style={{ fontSize: "12px" }}
                                    ></i>
                                  </div>
                                  <span className="fw-semibold">
                                    {order.participants}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <i className="icon-calendar-check text-success me-2"></i>
                                  <div>
                                    <strong
                                      className="d-block"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {new Date(
                                        order.selectedDate
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </strong>
                                    <small className="text-muted">
                                      {new Date(
                                        order.selectedDate
                                      ).toLocaleDateString("en-US", {
                                        weekday: "short",
                                      })}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="text-success fw-bold">
                                  <span style={{ fontSize: "14px" }}>
                                    {order.totalPrice.toLocaleString()}
                                  </span>
                                </div>
                                <small className="text-muted">USD</small>
                              </td>
                              <td className="py-3 text-center">
                                {disabled ? (
                                  <span className="text-muted">-</span>
                                ) : (
                                  <ChangeDateButtonOrStatus
                                    order={order}
                                    isDesktop={true}
                                  />
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <CancelButtonOrStatus
                                  order={order}
                                  isDesktop={true}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <PaginationControls
              orderData={orderData}
              currentPage={currentPage}
              pageSize={pageSize}
              loading={loading}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {selectedOrderForCancel && (
        <CancellationModal
          order={selectedOrderForCancel}
          onClose={() => setSelectedOrderForCancel(null)}
          onCancel={handleCancelSubmit}
        />
      )}

      {selectedOrderForDateChange &&
        !hasActiveDateChangeRequest(selectedOrderForDateChange) &&
        !isOrderDisabled(selectedOrderForDateChange) && (
          <ChangeDate
            isOpen={!!selectedOrderForDateChange}
            onClose={() => setSelectedOrderForDateChange(null)}
            order={selectedOrderForDateChange}
            onDateChange={handleDateChangeSubmit}
          />
        )}
    </>
  );
}
