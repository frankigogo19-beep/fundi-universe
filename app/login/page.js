"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Login will be connected to Supabase Authentication.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            🌍🔧
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0b4f8a",
              fontSize: "30px",
            }}
          >
            FUNDI UNIVERSE
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
            }}
          >
            Connect with trusted professionals worldwide
          </p>
        </div>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "28px 22px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#222",
              marginTop: 0,
              marginBottom: "8px",
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginBottom: "25px",
            }}
          >
            Login to your FUNDI UNIVERSE account
          </p>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#333",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d5dce5",
                borderRadius: "10px",
                marginBottom: "18px",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#333",
              }}
            >
              Password
            </label>

            <div
              style={{
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 75px 13px 13px",
                  border: "1px solid #d5dce5",
                  borderRadius: "10px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "7px",
                  border: "none",
                  background: "transparent",
                  color: "#0b4f8a",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "7px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div
              style={{
                textAlign: "right",
                marginBottom: "22px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  alert("Password reset will be connected to Supabase.")
                }
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#0b4f8a",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#0b4f8a",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "22px",
              color: "#666",
            }}
          >
            Don't have an account?
          </div>

          <Link
            href="/signup"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "10px",
              padding: "13px",
              border: "2px solid #0b4f8a",
              borderRadius: "10px",
              color: "#0b4f8a",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create Account
          </Link>

          <Link
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "18px",
              color: "#777",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Back to Home
          </Link>
        </section>

        <p
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: "12px",
            marginTop: "20px",
          }}
        >
          FUNDI UNIVERSE • Global Professional Services Platform
        </p>
      </div>
    </main>
  );
}
