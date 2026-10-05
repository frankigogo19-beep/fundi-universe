"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const currencies = [
  "TZS",
  "USD",
  "GBP",
  "EUR",
  "KES",
  "UGX",
  "RWF",
  "BIF",
  "ZAR",
  "ZMW",
  "MWK",
  "GHS",
  "NGN",
  "AED",
  "INR",
  "CAD",
  "AUD",
];

const cardNetworks = [
  "Visa",
  "Mastercard",
  "American Express",
  "Discover",
  "UnionPay",
  "JCB",
];

const mobileMoneyByCountry = {
  Tanzania: [
    "M-Pesa / Vodacom",
    "Airtel Money",
    "Mixx by Yas",
    "HaloPesa",
    "AzamPesa",
    "T-Pesa",
  ],

  Kenya: [
    "M-Pesa / Safaricom",
    "Airtel Money",
  ],

  Uganda: [
    "MTN MoMo",
    "Airtel Money",
  ],

  Rwanda: [
    "MTN MoMo",
    "Airtel Money",
  ],

  Burundi: [
    "Lumicash",
    "EcoCash",
  ],

  "South Sudan": [
    "MTN MoMo",
    "Airtel Money",
  ],

  Zambia: [
    "MTN MoMo",
    "Airtel Money",
  ],

  Malawi: [
    "Airtel Money",
    "TNM Mpamba",
  ],

  Zimbabwe: [
    "EcoCash",
  ],

  Mozambique: [
    "M-Pesa",
    "mKesh",
    "e-Mola",
  ],

  Ghana: [
    "MTN MoMo",
    "Telecel Cash",
  ],

  Nigeria: [
    "OPay",
    "PalmPay",
  ],

  "Côte d’Ivoire": [
    "MTN MoMo",
    "Orange Money",
    "Wave",
    "Moov Money",
  ],

  Senegal: [
    "Orange Money",
    "Wave",
  ],

  Cameroon: [
    "MTN MoMo",
    "Orange Money",
  ],

  "Democratic Republic of the Congo": [
    "M-Pesa",
    "Airtel Money",
    "Orange Money",
  ],

  Benin: [
    "MTN MoMo",
    "Moov Money",
  ],

  Gabon: [
    "Airtel Money",
    "Moov Money",
  ],

  Niger: [
    "Airtel Money",
    "Moov Money",
  ],

  Chad: [
    "Airtel Money",
    "Moov Money",
  ],

  Madagascar: [
    "Airtel Money",
    "Mvola",
  ],

  Ethiopia: [
    "telebirr",
    "M-Pesa",
  ],

  "South Africa": [
    "MTN MoMo",
  ],

  Eswatini: [
    "MTN MoMo",
  ],

  Liberia: [
    "MTN MoMo",
    "Orange Money",
  ],

  Guinea: [
    "MTN MoMo",
    "Orange Money",
  ],

  "Republic of the Congo": [
    "MTN MoMo",
    "Airtel Money",
  ],

  Sudan: [
    "MTN MoMo",
  ],
};

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "Burundi",
  "South Sudan",
  "Zambia",
  "Malawi",
  "Zimbabwe",
  "Mozambique",
  "Ghana",
  "Nigeria",
  "Côte d’Ivoire",
  "Senegal",
  "Cameroon",
  "Democratic Republic of the Congo",
  "Benin",
  "Gabon",
  "Niger",
  "Chad",
  "Madagascar",
  "Ethiopia",
  "South Africa",
  "Eswatini",
  "Liberia",
  "Guinea",
  "Republic of the Congo",
  "Sudan",
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState("");

  // PAYMENT STATES
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("TZS");
  const [paymentAmount, setPaymentAmount] = useState("");

  const [paymentCountry, setPaymentCountry] = useState("Tanzania");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [paymentPhone, setPaymentPhone] = useState("");

  const [cardNetwork, setCardNetwork] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      // CHECK ADMIN ROLE
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profile?.role === "admin") {
        setIsAdmin(true);
      }

      // CUSTOMER PROFILE
      const { data: customerData } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      setCustomer(customerData);

      // CUSTOMER REQUESTS
      const { data: requestData } = await supabase
        .from("job_requests")
        .select("*")
        .eq("customer_id", currentUser.id)
        .order("created_at", { ascending: false });

      setRequests(requestData || []);

      // NOTIFICATIONS
      const { data: notificationData } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      setNotifications(notificationData || []);

      if (customerData?.location) {
        setLocation(customerData.location);
      }
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLocation() {
    setLocationMessage("");

    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const { error } = await supabase
            .from("customers")
            .update({
              latitude,
              longitude,
              location_updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);

          if (error) {
            setLocationMessage(error.message);
            return;
          }

          setLocationMessage("Location updated successfully.");
        } catch (error) {
          setLocationMessage("Unable to update location.");
        }
      },
      () => {
        setLocationMessage(
          "Location permission was denied or unavailable."
        );
      }
    );
  }

  async function markNotificationRead(id) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    }
  }

  async function markAllNotificationsRead() {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (!error) {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    }
  }

  // =========================
  // PAYMENT
  // =========================

  function openPayment(request) {
    setSelectedRequest(request);

    setPaymentMethod("");
    setPaymentCurrency(request?.currency || "TZS");
    setPaymentAmount(request?.budget || "");

    const requestCountry =
      request?.country ||
      customer?.country ||
      "Tanzania";

    setPaymentCountry(requestCountry);
    setMobileNetwork("");
    setPaymentPhone("");

    setCardNetwork("");
    setCardholderName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");

    setPaymentMessage("");
    setPaymentOpen(true);
  }

  function closePayment() {
    setPaymentOpen(false);
    setSelectedRequest(null);
    setPaymentMessage("");
  }

  function handlePaymentCountryChange(country) {
    setPaymentCountry(country);
    setMobileNetwork("");
  }

  function handlePaymentMethodChange(method) {
    setPaymentMethod(method);
    setPaymentMessage("");
  }

  function submitPayment(e) {
    e.preventDefault();

    if (!paymentMethod) {
      setPaymentMessage("Please select a payment method.");
      return;
    }

    if (!paymentAmount || Number(paymentAmount) <= 0) {
      setPaymentMessage("Please enter a valid payment amount.");
      return;
    }

    if (paymentMethod === "Mobile Money") {
      if (!paymentCountry) {
        setPaymentMessage("Please select your country.");
        return;
      }

      if (!mobileNetwork) {
        setPaymentMessage("Please select a mobile money network.");
        return;
      }

      if (!paymentPhone) {
        setPaymentMessage("Please enter your mobile money number.");
        return;
      }
    }

    if (paymentMethod === "Card") {
      if (!cardNetwork) {
        setPaymentMessage("Please select your card network.");
        return;
      }

      if (!cardholderName) {
        setPaymentMessage("Please enter the cardholder name.");
        return;
      }

      if (!cardNumber) {
        setPaymentMessage("Please enter the card number.");
        return;
      }

      if (!expiryDate) {
        setPaymentMessage("Please enter the expiry date.");
        return;
      }

      if (!cvv) {
        setPaymentMessage("Please enter the CVV/CVC.");
        return;
      }
    }

    const transaction = {
      id: `PAY-${Date.now()}`,
      requestId: selectedRequest?.id || null,
      amount: Number(paymentAmount),
      currency: paymentCurrency,
      method: paymentMethod,
      country:
        paymentMethod === "Mobile Money"
          ? paymentCountry
          : "Global",
      network:
        paymentMethod === "Mobile Money"
          ? mobileNetwork
          : cardNetwork,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setPaymentHistory((prev) => [transaction, ...prev]);

    setPaymentMessage(
      "Payment request created successfully. Real payment processing will be connected when the payment provider is integrated."
    );
  }

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  function statusClass(status) {
    if (!status) return "status";

    const value = status.toLowerCase();

    if (value === "completed") return "status completed";
    if (value === "accepted") return "status accepted";
    if (value === "rejected") return "status rejected";
    if (value === "in progress") return "status progress";

    return "status";
  }

  if (loading) {
    return (
      <main className="loading-page">
        <div className="loading-card">
          <h2>Loading Dashboard...</h2>
          <p>Please wait.</p>
        </div>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fb;
            padding: 20px;
          }

          .loading-card {
            background: white;
            padding: 35px;
            border-radius: 18px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="brand">
          <div className="logo-placeholder">FU</div>

          <div>
            <strong>Fundi Universe</strong>
            <span>Professionals worldwide</span>
          </div>
        </div>

        <div className="top-actions">
          <Link href="/professionals" className="find-button">
            Find a Professional
          </Link>

          {isAdmin && (
            <Link href="/admin/dashboard" className="admin-button">
              Admin Dashboard
            </Link>
          )}
        </div>
      </header>

      <div className="container">
        {/* WELCOME */}
        <section className="welcome-card">
          <div>
            <span className="eyebrow">CUSTOMER DASHBOARD</span>

            <h1>
              Welcome
              {customer?.full_name
                ? `, ${customer.full_name}`
                : ""}
            </h1>

            <p>
              Find professionals, manage service requests and
              make payments securely.
            </p>
          </div>
        </section>

        {/* LOCATION */}
        <section className="location-card">
          <div>
            <span className="section-label">YOUR LOCATION</span>
            <h2>{location || "Location not set"}</h2>

            {locationMessage && (
              <p className="location-message">
                {locationMessage}
              </p>
            )}
          </div>

          <button onClick={updateLocation}>
            Update Location
          </button>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>

          <div className="stat-card">
            <span>Unread Notifications</span>
            <strong>{unreadNotifications}</strong>
          </div>

          <div className="stat-card">
            <span>Location</span>
            <strong>{location ? "Active" : "Not Set"}</strong>
          </div>

          <div className="stat-card payment-stat">
            <span>Payments</span>
            <strong>{paymentHistory.length}</strong>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="section-label">UPDATES</span>
              <h2>Notifications</h2>
            </div>

            {unreadNotifications > 0 && (
              <button
                className="small-button"
                onClick={markAllNotificationsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="empty-card">
              <p>No notifications yet.</p>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${
                    notification.is_read ? "read" : "unread"
                  }`}
                >
                  <div>
                    <h3>
                      {notification.title || "Notification"}
                    </h3>

                    <p>
                      {notification.message ||
                        "You have a new notification."}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() =>
                        markNotificationRead(notification.id)
                      }
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SERVICE REQUESTS */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="section-label">SERVICES</span>
              <h2>Service Requests</h2>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="empty-card">
              <p>You have not created any service requests yet.</p>

              <Link href="/professionals" className="primary-button">
                Find a Professional
              </Link>
            </div>
          ) : (
            <div className="request-grid">
              {requests.map((request) => (
                <div className="request-card" key={request.id}>
                  <div className="request-top">
                    <div>
                      <span className="request-id">
                        Request #{request.id}
                      </span>

                      <h3>
                        {request.service ||
                          request.title ||
                          "Service Request"}
                      </h3>
                    </div>

                    <span className={statusClass(request.status)}>
                      {request.status || "Pending"}
                    </span>
                  </div>

                  {request.description && (
                    <p className="request-description">
                      {request.description}
                    </p>
                  )}

                  <div className="request-details">
                    {request.budget && (
                      <div>
                        <span>Budget</span>
                        <strong>
                          {request.currency || "TZS"}{" "}
                          {request.budget}
                        </strong>
                      </div>
                    )}

                    {request.country && (
                      <div>
                        <span>Country</span>
                        <strong>{request.country}</strong>
                      </div>
                    )}
                  </div>

                  <div className="request-actions">
                    <button
                      className="pay-button"
                      onClick={() => openPayment(request)}
                    >
                      💳 Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PAYMENT HISTORY */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="section-label">TRANSACTIONS</span>
              <h2>Payment History</h2>
            </div>
          </div>

          {paymentHistory.length === 0 ? (
            <div className="empty-card">
              <p>No payments have been initiated yet.</p>
            </div>
          ) : (
            <div className="payment-history">
              {paymentHistory.map((payment) => (
                <div
                  className="payment-history-card"
                  key={payment.id}
                >
                  <div>
                    <span>{payment.id}</span>
                    <h3>
                      {payment.currency}{" "}
                      {payment.amount.toLocaleString()}
                    </h3>
                    <p>
                      {payment.method} •{" "}
                      {payment.network}
                    </p>
                  </div>

                  <span className="payment-pending">
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* QUICK LINKS */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="section-label">SHORTCUTS</span>
              <h2>Quick Links</h2>
            </div>
          </div>

          <div className="quick-grid">
            <Link href="/professionals" className="quick-card">
              <span>🔎</span>
              <strong>Find a Professional</strong>
              <small>Search professionals worldwide</small>
            </Link>

            <Link href="/notifications" className="quick-card">
              <span>🔔</span>
              <strong>Notifications</strong>
              <small>View your latest updates</small>
            </Link>

            <Link href="/customers" className="quick-card">
              <span>👤</span>
              <strong>Customer Area</strong>
              <small>Manage your customer profile</small>
            </Link>

            <button
              className="quick-card payment-quick-card"
              onClick={() =>
                requests.length > 0
                  ? openPayment(requests[0])
                  : setPaymentOpen(true)
              }
            >
              <span>💳</span>
              <strong>Payment</strong>
              <small>Choose Card or Mobile Money</small>
            </button>

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="quick-card admin-quick-card"
              >
                <span>⚙️</span>
                <strong>Admin Dashboard</strong>
                <small>Private administration area</small>
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* PAYMENT MODAL */}
      {paymentOpen && (
        <div
          className="payment-overlay"
          onClick={closePayment}
        >
          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="section-label">
                  SECURE PAYMENT
                </span>

                <h2>Make a Payment</h2>

                {selectedRequest && (
                  <p>
                    Request #{selectedRequest.id}
                  </p>
                )}
              </div>

              <button
                className="close-button"
                onClick={closePayment}
              >
                ×
              </button>
            </div>

            <form onSubmit={submitPayment}>
              {/* AMOUNT */}
              <div className="form-group">
                <label>Amount</label>

                <div className="amount-row">
                  <select
                    value={paymentCurrency}
                    onChange={(e) =>
                      setPaymentCurrency(e.target.value)
                    }
                  >
                    {currencies.map((currency) => (
                      <option
                        key={currency}
                        value={currency}
                      >
                        {currency}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="form-group">
                <label>Payment Method</label>

                <div className="method-grid">
                  <button
                    type="button"
                    className={`method-card ${
                      paymentMethod === "Card"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handlePaymentMethodChange("Card")
                    }
                  >
                    <span>💳</span>
                    <strong>Card</strong>
                    <small>
                      Global card payments
                    </small>
                  </button>

                  <button
                    type="button"
                    className={`method-card ${
                      paymentMethod === "Mobile Money"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handlePaymentMethodChange(
                        "Mobile Money"
                      )
                    }
                  >
                    <span>📱</span>
                    <strong>Mobile Money</strong>
                    <small>
                      Africa & supported markets
                    </small>
                  </button>
                </div>
              </div>

              {/* CARD */}
              {paymentMethod === "Card" && (
                <div className="payment-panel">
                  <div className="panel-title">
                    <h3>Global Card Payment</h3>
                    <p>
                      Select the card network used by
                      your card.
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Card Network</label>

                    <select
                      value={cardNetwork}
                      onChange={(e) =>
                        setCardNetwork(e.target.value)
                      }
                    >
                      <option value="">
                        Select card network
                      </option>

                      {cardNetworks.map((network) => (
                        <option
                          key={network}
                          value={network}
                        >
                          {network}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>

                    <input
                      type="text"
                      value={cardholderName}
                      onChange={(e) =>
                        setCardholderName(e.target.value)
                      }
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(e.target.value)
                      }
                      placeholder="Card number"
                      maxLength="19"
                    />
                  </div>

                  <div className="card-row">
                    <div className="form-group">
                      <label>Expiry Date</label>

                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) =>
                          setExpiryDate(e.target.value)
                        }
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV / CVC</label>

                      <input
                        type="password"
                        inputMode="numeric"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value)
                        }
                        placeholder="CVV"
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div className="security-note">
                    🔒 Card details should be processed
                    through a secure payment provider when
                    live payments are connected.
                  </div>
                </div>
              )}

              {/* MOBILE MONEY */}
              {paymentMethod === "Mobile Money" && (
                <div className="payment-panel">
                  <div className="panel-title">
                    <h3>Mobile Money</h3>
                    <p>
                      Select your country and mobile money
                      network.
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Country</label>

                    <select
                      value={paymentCountry}
                      onChange={(e) =>
                        handlePaymentCountryChange(
                          e.target.value
                        )
                      }
                    >
                      {countries.map((country) => (
                        <option
                          key={country}
                          value={country}
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mobile Money Network</label>

                    <select
                      value={mobileNetwork}
                      onChange={(e) =>
                        setMobileNetwork(e.target.value)
                      }
                    >
                      <option value="">
                        Select network
                      </option>

                      {(
                        mobileMoneyByCountry[
                          paymentCountry
                        ] || []
                      ).map((network) => (
                        <option
                          key={network}
                          value={network}
                        >
                          {network}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mobile Money Number</label>

                    <input
                      type="tel"
                      value={paymentPhone}
                      onChange={(e) =>
                        setPaymentPhone(e.target.value)
                      }
                      placeholder="+255 7XX XXX XXX"
                    />
                  </div>

                  <div className="security-note">
                    📱 Your mobile money number will be
                    used by the future payment provider to
                    process the transaction.
                  </div>
                </div>
              )}

              {/* MESSAGE */}
              {paymentMessage && (
                <div className="payment-message">
                  {paymentMessage}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closePayment}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="continue-button"
                >
                  Continue Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #172033;
        }

        .topbar {
          min-height: 76px;
          background: white;
          border-bottom: 1px solid #e7eaf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 5%;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #0d6efd;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .brand strong,
        .brand span {
          display: block;
        }

        .brand strong {
          font-size: 18px;
        }

        .brand span {
          color: #7b8494;
          font-size: 12px;
          margin-top: 2px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .find-button,
        .admin-button {
          text-decoration: none;
          padding: 11px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
        }

        .find-button {
          background: #0d6efd;
          color: white;
        }

        .admin-button {
          background: #172033;
          color: white;
        }

        .container {
          width: min(1180px, 92%);
          margin: 0 auto;
          padding: 30px 0 60px;
        }

        .welcome-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 30px rgba(20, 30, 50, 0.06);
          margin-bottom: 20px;
        }

        .eyebrow,
        .section-label {
          color: #0d6efd;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .welcome-card h1 {
          margin: 8px 0;
          font-size: clamp(28px, 5vw, 42px);
        }

        .welcome-card p {
          margin: 0;
          color: #6d7686;
          line-height: 1.6;
        }

        .location-card {
          background: white;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          border: 1px solid #e8ebf1;
        }

        .location-card h2 {
          margin: 7px 0 0;
          font-size: 20px;
        }

        .location-card button,
        .small-button {
          border: 0;
          background: #edf4ff;
          color: #0d6efd;
          padding: 10px 15px;
          border-radius: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .location-message {
          color: #667085;
          font-size: 13px;
          margin: 7px 0 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid #e8ebf1;
        }

        .stat-card span,
        .request-details span {
          display: block;
          color: #7b8494;
          font-size: 13px;
        }

        .stat-card strong {
          display: block;
          font-size: 26px;
          margin-top: 8px;
        }

        .payment-stat {
          border: 1px solid #cfe0ff;
        }

        .dashboard-section {
          margin-top: 30px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
        }

        .section-header h2 {
          margin: 5px 0 0;
          font-size: 24px;
        }

        .empty-card {
          background: white;
          border: 1px solid #e8ebf1;
          border-radius: 16px;
          padding: 28px;
          color: #737c8d;
        }

        .primary-button {
          display: inline-block;
          margin-top: 12px;
          background: #0d6efd;
          color: white;
          text-decoration: none;
          padding: 11px 16px;
          border-radius: 10px;
          font-weight: 700;
        }

        .notification-list {
          display: grid;
          gap: 12px;
        }

        .notification-card {
          background: white;
          border: 1px solid #e8ebf1;
          border-radius: 15px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .notification-card.unread {
          border-left: 4px solid #0d6efd;
        }

        .notification-card h3 {
          margin: 0 0 6px;
        }

        .notification-card p {
          margin: 0;
          color: #70798a;
        }

        .notification-card button {
          align-self: center;
          border: 0;
          background: #f0f4f9;
          padding: 9px 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .request-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .request-card {
          background: white;
          border: 1px solid #e8ebf1;
          border-radius: 17px;
          padding: 20px;
        }

        .request-top {
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .request-id {
          color: #8a93a3;
          font-size: 12px;
        }

        .request-card h3 {
          margin: 6px 0 0;
          font-size: 19px;
        }

        .request-description {
          color: #6d7686;
          line-height: 1.55;
        }

        .status {
          height: fit-content;
          padding: 7px 10px;
          background: #f1f3f6;
          color: #697386;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .status.completed {
          background: #e7f8ef;
          color: #18864b;
        }

        .status.accepted {
          background: #eaf2ff;
          color: #0d6efd;
        }

        .status.rejected {
          background: #ffecec;
          color: #d92d20;
        }

        .status.progress {
          background: #fff5df;
          color: #b66a00;
        }

        .request-details {
          display: flex;
          gap: 35px;
          padding: 15px 0;
          border-top: 1px solid #edf0f4;
          border-bottom: 1px solid #edf0f4;
        }

        .request-details strong {
          display: block;
          margin-top: 5px;
        }

        .request-actions {
          padding-top: 15px;
        }

        .pay-button {
          width: 100%;
          border: 0;
          background: #0d6efd;
          color: white;
          padding: 12px;
          border-radius: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .payment-history {
          display: grid;
          gap: 12px;
        }

        .payment-history-card {
          background: white;
          border: 1px solid #e8ebf1;
          border-radius: 15px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .payment-history-card span:first-child {
          color: #8a93a3;
          font-size: 12px;
        }

        .payment-history-card h3 {
          margin: 5px 0;
        }

        .payment-history-card p {
          margin: 0;
          color: #717b8c;
          font-size: 13px;
        }

        .payment-pending {
          background: #fff5df;
          color: #a65f00;
          padding: 7px 11px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .quick-card {
          border: 1px solid #e8ebf1;
          background: white;
          border-radius: 16px;
          padding: 20px;
          text-decoration: none;
          color: #172033;
          text-align: left;
          cursor: pointer;
        }

        .quick-card span {
          display: block;
          font-size: 25px;
          margin-bottom: 12px;
        }

        .quick-card strong,
        .quick-card small {
          display: block;
        }

        .quick-card small {
          color: #7b8494;
          margin-top: 6px;
        }

        .payment-quick-card {
          font-family: inherit;
        }

        .admin-quick-card {
          background: #f8f9fb;
        }

        /* PAYMENT MODAL */

        .payment-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          overflow-y: auto;
        }

        .payment-modal {
          width: min(620px, 100%);
          max-height: 92vh;
          overflow-y: auto;
          background: white;
          border-radius: 22px;
          padding: 25px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 22px;
        }

        .modal-header h2 {
          margin: 6px 0;
          font-size: 27px;
        }

        .modal-header p {
          margin: 0;
          color: #788193;
        }

        .close-button {
          width: 38px;
          height: 38px;
          border: 0;
          background: #f1f3f6;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          font-weight: 700;
          font-size: 13px;
        }

        .form-group input,
        .form-group select,
        .amount-row input,
        .amount-row select {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #dfe3ea;
          border-radius: 10px;
          padding: 12px;
          font-size: 14px;
          background: white;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #0d6efd;
        }

        .amount-row {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 10px;
        }

        .method-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .method-card {
          text-align: left;
          border: 1px solid #dfe3ea;
          background: white;
          border-radius: 14px;
          padding: 17px;
          cursor: pointer;
        }

        .method-card.selected {
          border: 2px solid #0d6efd;
          background: #f5f9ff;
        }

        .method-card span,
        .method-card strong,
        .method-card small {
          display: block;
        }

        .method-card span {
          font-size: 25px;
          margin-bottom: 8px;
        }

        .method-card strong {
          font-size: 15px;
        }

        .method-card small {
          color: #7b8494;
          margin-top: 4px;
        }

        .payment-panel {
          background: #f8faff;
          border: 1px solid #dfe9fa;
          border-radius: 15px;
          padding: 17px;
          margin-bottom: 16px;
        }

        .panel-title {
          margin-bottom: 15px;
        }

        .panel-title h3 {
          margin: 0 0 4px;
        }

        .panel-title p {
          margin: 0;
          color: #778194;
          font-size: 13px;
        }

        .card-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .security-note {
          background: #eef6ff;
          color: #4b6280;
          border-radius: 10px;
          padding: 11px;
          font-size: 12px;
          line-height: 1.5;
        }

        .payment-message {
          background: #eef8f1;
          color: #19703e;
          border: 1px solid #ccebd8;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 13px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .cancel-button,
        .continue-button {
          border: 0;
          padding: 12px 17px;
          border-radius: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .cancel-button {
          background: #edf0f4;
          color: #4e5869;
        }

        .continue-button {
          background: #0d6efd;
          color: white;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .topbar,
          .location-card,
          .section-header {
            align-items: flex-start;
          }

          .topbar {
            flex-direction: column;
          }

          .top-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .find-button,
          .admin-button {
            flex: 1;
            text-align: center;
          }

          .request-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid,
          .quick-grid {
            grid-template-columns: 1fr;
          }

          .location-card {
            flex-direction: column;
          }

          .location-card button {
            width: 100%;
          }

          .method-grid,
          .card-row {
            grid-template-columns: 1fr;
          }

          .amount-row {
            grid-template-columns: 1fr;
          }

          .payment-modal {
            padding: 19px;
          }
        }
      `}</style>
    </main>
  );
}
