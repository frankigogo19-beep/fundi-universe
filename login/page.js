"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    alert("Login will be connected to Supabase Authentication.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px",
        color: "#172033",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "40px",
          boxSizing: "border-box",
          boxShadow: "0 15px 45px rgba(20, 40, 80, 0.10)",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "42px", marginBottom: "8px" }}>
            🌍
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            FUNDI{" "}
            <span style={{ color: "#f28c28" }}>
              UNIVERSE
            </span>
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#667085",
              fontSize: "14px",
            }}
          >
            Find trusted professionals anywhere in the world
          </p>
        </div>

        {/* TITLE */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "25px",
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              margin: 0,
              color: "#667085",
              fontSize: "14px",
            }}
          >
            Login to your Fundi Universe account.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "9px",
                border: "1px solid #ccd5e2",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              Password
            </label>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "14px",
                  borderRadius: "9px",
                  border: "1px solid #ccd5e2",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  padding: "0 13px",
                  borderRadius: "9px",
                  border: "1px solid #ccd5e2",
                  background: "#ffffff",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "25px",
            }}
          >
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                color: "#1769aa",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "9px",
              background: "#1769aa",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "28px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5eaf1",
            }}
          />

          <span
            style={{
              color: "#98a2b3",
              fontSize: "13px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5eaf1",
            }}
          />
        </div>

        {/* SIGN UP */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#667085",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            Don't have an account?
          </p>

          <a
            href="/signup"
            style={{
              display: "block",
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              borderRadius: "9px",
              border: "1px solid #1769aa",
              background: "#ffffff",
              color: "#1769aa",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Create Account
          </a>
        </div>

        {/* PROFESSIONAL NOTE */}
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            borderRadius: "10px",
            background: "#f7f9fc",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#667085",
              lineHeight: "1.6",
            }}
          >
            Are you a professional?
            <br />
            You will be able to create your professional
            profile, list your skills and services, and
            provide certificates or qualifications when
            verification is required.
          </p>
        </div>

        {/* BACK HOME */}
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <a
            href="/"
            style={{
              color: "#1769aa",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ← Back to Fundi Universe
          </a>
        </div>
      </div>
    </main>
  );
}
