import { useState } from "react";
import api from "../services/api";

function Payment() {

  const [response, setResponse] = useState(null);

  // -------------------------
  // Successful Payment
  // -------------------------
  const paymentSuccess = () => {

    const risk = localStorage.getItem("risk_level") || "Low";

    api.post(`/payment?status=success&risk_level=${risk}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  // -------------------------
  // Failed Payment
  // -------------------------
  const paymentFailed = () => {

    const risk = localStorage.getItem("risk_level") || "Low";

    api.post(`/payment?status=failed&risk_level=${risk}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (

    <div
      style={{
        marginTop: "40px",
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
      }}
    >

      <h2>💳 Payment Simulation</h2>

      <p>
        First predict the customer's risk using the AI Prediction form.
        Then simulate the payment outcome.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px"
        }}
      >

        <button
          onClick={paymentSuccess}
          style={{
            padding: "12px 20px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ✅ Successful Payment
        </button>

        <button
          onClick={paymentFailed}
          style={{
            padding: "12px 20px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ❌ Failed Payment
        </button>

      </div>

      {response && (

        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#f8fafc",
            borderRadius: "12px",
            borderLeft:
              response.status === "success"
                ? "8px solid #22c55e"
                : "8px solid #ef4444"
          }}
        >

          <h2>{response.message}</h2>

          {/* ---------------- Success ---------------- */}

          {response.status === "success" && (

            <div
              style={{
                background: "#dcfce7",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px"
              }}
            >

              <h2 style={{ color: "#15803d" }}>
                🎉 Order Completed Successfully
              </h2>

              <p>
                Thank you for shopping with Cart Rescue AI.
              </p>

            </div>

          )}

          {/* ---------------- Coupon Generated ---------------- */}

          {response.status === "failed" && response.coupon && (

            <div
              style={{
                background: "#dcfce7",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px"
              }}
            >

              <h2
                style={{
                  color: "#15803d"
                }}
              >
                🎁 Coupon Generated
              </h2>

              <h1
                style={{
                  margin: "10px 0",
                  color: "#16a34a"
                }}
              >
                {response.coupon}
              </h1>

              <h3>
                Discount : {response.discount}
              </h3>

              <p>
                Use this coupon during checkout to complete your purchase.
              </p>

            </div>

          )}

          {/* ---------------- Retry Payment ---------------- */}

          {response.status === "failed" && !response.coupon && (

            <div
              style={{
                background: "#fee2e2",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px"
              }}
            >

              <h2
                style={{
                  color: "#dc2626"
                }}
              >
                {response.recommendation}
              </h2>

              <p>
                Payment could not be completed.
                Please retry your payment.
              </p>

              <p>
                No coupon was generated because the customer has a low
                abandonment risk.
              </p>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default Payment;