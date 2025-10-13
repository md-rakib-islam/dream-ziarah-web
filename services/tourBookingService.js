import {
  GET_BOOKINGS_BY_ID,
  GET_BOOKINGS_BY_UUID,
  getAllTourBookingByTravellerID,
} from "@/constant/constants";

export const fetchBookingByID = async (bookingId) => {
  try {
    const response = await fetch(`${GET_BOOKINGS_BY_ID}${bookingId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`, // Uncomment if auth needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};

export const fetchBookingByUUID = async (bookingId) => {
  try {
    const response = await fetch(`${GET_BOOKINGS_BY_UUID}${bookingId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`, // Uncomment if auth needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};

export const fetchTourBookings = async (travellerId, page = 1, size = 5) => {
  try {
    const url = `${getAllTourBookingByTravellerID}${travellerId}/?page=${page}&size=${size}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour bookings:", error);
    throw error;
  }
};

// Transform API data to match our component structure with pagination support
export const transformBookingData = (apiResponse) => {
  const bookings = apiResponse.tour_bookings || [];

  // Extract pagination info from API response
  const paginationData = {
    page: apiResponse.page || 1,
    size: apiResponse.size || 10,
    totalPages: apiResponse.total_pages || 0,
    totalElements: apiResponse.total_elements || 0,
    paidOrders: apiResponse.paid || 0,
    pendingPayment: apiResponse.pending || 0,
    cancelledOrders: apiResponse.cancelled || 0,
  };

  // Calculate summary statistics for all data (not just current page)
  const summary = {
    totalOrders: paginationData.totalElements,
    paidOrders: paginationData?.paidOrders,
    pendingPayment: paginationData?.pendingPayment,
    cancelledOrders: paginationData?.cancelledOrders,
  };

  // Transform bookings to match component structure
  const transformedBookings = bookings.map((booking) => ({
    id: `TB${booking.id.toString().padStart(3, "0")}`, // TB001, TB002, etc.
    originalId: booking.id, // Keep original ID for API calls
    status: booking.status,
    participants: booking.total_participants,
    datePurchased: booking.created_at.split("T")[0], // Extract date part
    totalPrice: Number.parseFloat(booking.total_price),
    tourName: booking.tour,
    customerName: booking.created_by,
    customerEmail: `${booking.created_by}@example.com`, // You might need to get this from user data
    selectedDate: booking.selected_date,
    selectedTime: booking.selected_time,
    pricePerPerson: Number.parseFloat(booking.price_per_person),
    groupPrice: Number.parseFloat(booking.group_price || 0),
    priceByPassenger: booking.price_by_passenger,
    priceByVehicle: booking.price_by_vehicle,
    guide: booking.guide,
    paymentKey: booking.payment_key,
    paymentUrl: booking.payment_url, // New field for Stripe payment URL
    createdAt: booking.created_at,
    updatedAt: booking.updated_at,
    travellerId: booking.traveller,
    userId: booking.user,
    payment: booking.payment,
    tour_id: booking.tour_id,
    previous_selected_date: booking.previous_selected_date,
    date_change_request: booking.date_change_request,
    requested_selected_date: booking.requested_selected_date,
    date_request_approved: booking.date_request_approved,
    date_change_request_status: booking.date_change_request_status,
    cancellation_request: booking.cancellation_request,
    cancellation_reason: booking.cancellation_reason,
    cancellation_status: booking.cancellation_status,
    booking_id: booking.booking_id,
    booking_ticket: booking.booking_ticket,
    payment_invoice: booking.payment_invoice,
    cancellation_denied_count: booking.cancellation_denied_count,
    cancellation_eligible: booking.cancellation_eligible,
    cloudflare_thumbnail_image_url: booking.cloudflare_thumbnail_image_url,
  }));

  return {
    summary,
    orders: transformedBookings,
    // ADD THESE PAGINATION FIELDS
    page: paginationData.page,
    size: paginationData.size,
    totalPages: paginationData.totalPages,
    totalElements: paginationData.totalElements,
  };
};

// Function to handle Stripe payment
export const processStripePayment = (paymentUrl) => {
  if (!paymentUrl) {
    throw new Error("Payment URL is required");
  }

  // Open Stripe checkout in a new tab
  const paymentWindow = window.open(
    paymentUrl,
    "_blank",
    "width=800,height=600,scrollbars=yes,resizable=yes"
  );

  return new Promise((resolve, reject) => {
    // Check if the window was blocked
    if (!paymentWindow) {
      reject(
        new Error(
          "Payment window was blocked. Please allow popups and try again."
        )
      );
      return;
    }

    // Monitor the payment window
    const checkClosed = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(checkClosed);
        // Window closed - we need to check payment status
        // In a real app, you might want to poll your backend to check payment status
        resolve({
          success: true,
          message:
            "Payment window closed. Please refresh to see updated status.",
        });
      }
    }, 1000);

    // Set a timeout for the payment process (10 minutes)
    setTimeout(() => {
      clearInterval(checkClosed);
      if (!paymentWindow.closed) {
        paymentWindow.close();
      }
      reject(new Error("Payment process timed out"));
    }, 600000); // 10 minutes
  });
};
