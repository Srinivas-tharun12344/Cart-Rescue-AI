function Navbar() {
  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left Side */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
          }}
        >
          🛒 Cart Rescue AI
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "14px",
            color: "#cbd5e1",
          }}
        >
          AI Powered Cart Abandonment Prediction
        </p>
      </div>

      {/* Right Side */}
      <div
        style={{
          fontSize: "15px",
          color: "#cbd5e1",
        }}
      >
        Hackathon Demo
      </div>
    </div>
  );
}

export default Navbar;