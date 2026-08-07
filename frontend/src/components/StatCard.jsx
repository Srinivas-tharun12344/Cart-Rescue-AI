import React from "react";

function StatCard({ title, value, color, icon }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "260px",
        background: color,
        color: "white",
        borderRadius: "16px",
        padding: "25px",
        height: "190px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: "36px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: "500",
        }}
      >
        {title}
      </h3>

      {/* Value */}
      <h1
        style={{
          marginTop: "20px",
          fontSize: "56px",
          fontWeight: "bold",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;